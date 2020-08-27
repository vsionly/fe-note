/******************************************************************
 * 使用puppeteer 抓取数据
 ******************************************************************/

const fs = require( 'fs' );
const path = require( 'path' );
const puppeteer = require( 'puppeteer' );
const Ynn = require( 'ynn' );

module.exports = class extends Ynn.Controller {

    async runAction() {

        const { ctx } = this;
        const { query } = ctx;
        const headless = this.assert( query.headless ).default( '1' ).value();
        const product = this.assert( query.product ).default( 'firefox' ).value();
        const account = this.assert( query.account ).required( 'account' ).value();

        const password = this.config( `accounts.${account}.password` );

        try {
            const browser = await puppeteer.launch( {
                product,
                headless : !!+headless,
                devtools : false,
                defaultViewport : {
                    width : 1280,
                    height : 800
                }
            } );

            const page = await browser.newPage();

            const login = async () => {
                const url = 'https://www.bjjnts.cn/login';
                await page.goto( url, { waitUntil : 'load' } ).catch( e => {
                    this.output.error( `Failed to open page ${url}.`, e );
                } );

                await page.evaluate( ( account, password ) => {
                    document.querySelector( '[name=username]' ).value = account;
                    document.querySelector( '[name=password]' ).value = password;
                    document.querySelector( '.login_btn' ).click();
                }, account, password );
            };

            const getId = async () => {
                const url = 'https://www.bjjnts.cn/staff/index.html';
                await page.goto( url, { waitUntil : 'load' } ).catch( e => {
                    this.output.error( `Failed to open page ${url}.`, e );
                } );

                return page.evaluate( () => {
                    return document.querySelector( 'a[href^="/staff/live/"]' ).getAttribute( 'href' ).match( /\/staff\/live\/(\d+)/ )?.[ 1 ];
                } );
            };

            const getVideoList = async ( id, pn ) => {
                const url = `https://www.bjjnts.cn/staff/live/${id}?id=${id}&page=${pn}`;

                await page.goto( url, { waitUntil : 'load' } ).catch( e => {
                    this.output.error( `Failed to open page ${url}.`, e );
                } );

                return await page.evaluate( () => {
                    const res = [];
                    const list = document.querySelectorAll( '.adminmodule_list' );

                    if( !list?.length ) return false;

                    for( const item of list ) {
                        const td = item.querySelectorAll( ':scope>td' );
                        const type = td[ 1 ]?.innerText
                        const name = td[ 2 ]?.innerText;
                        const time = td[ 3 ]?.innerText;
                        const duration = td[ 4 ]?.innerText;
                        const id = item.querySelector( 'a[href^="/staff/liveDetail"].adminmodule_edit' )?.href.match( /\/staff\/liveDetail\/\d+\/(\d+)/ )?.[ 1 ];
                        res.push( { id, type, name, time, duration } );
                    }

                    return res;
                } );
            };

            const getStaffRecordOfVideo = async ( id, vid ) => {
                const url = `https://www.bjjnts.cn/staff/liveDetail/${id}/${vid}`;

                await page.goto( url, { waitUntil : 'load' } ).catch( e => {
                    this.output.error( `Failed to open page ${url}.`, e );
                } );

                return await page.evaluate( () => {
                    const res = [];

                    const list = document.querySelectorAll( '.certificate_listbox tr' );
                    for( const item of list ) {
                        const td = item.querySelectorAll( ':scope>td' );
                        const num = td[ 0 ]?.innerText.trim();
                        const name = td[ 1 ]?.innerText.trim();
                        const durationOfWatchingLive = td[ 3 ]?.innerText.trim();
                        const durationOfWatchingPlayback = td[ 4 ]?.innerText.trim();
                        res.push( { num, name, durationOfWatchingLive, durationOfWatchingPlayback } );
                    }

                    return res;
                } );
            }

            await login();
            await page.waitFor( 300 );
            const id = await getId();

            const lessons = [];

            let pn = 1;
            let goon = true;

            while( goon ) {
                const data = await getVideoList( id, pn++ );
                if( data === false ) {
                    goon = false;
                    break;
                }
                lessons.push( ...data );
            }

            for( const lesson of lessons ) {
                const res = await getStaffRecordOfVideo( id, lesson.id );
                lesson.data = res;
            }

            if( lessons.length ) {
                fs.writeFileSync(
                    path.resolve( this.app.root, `data/${account}.json` ),
                    JSON.stringify( lessons, null, '    ' )
                );
            }

            await browser.close();
            return { status : 0, message : 'success' };
        } catch( e ) {
            return { status : 1, message : 'error' };
        }
    }
}
