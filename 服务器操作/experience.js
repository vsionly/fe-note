/*
 * linux系统使用经验总结
 *
 */
// 安装指定版本的node
`
curl -fsSL https://rpm.nodesource.com/setup_14.x | bash -
sudo yum -y install nodejs
`

// 查看端口占用
`
lsof -i:3000
netstat -tun | grep 8881
ps -aef | grep 'luoshi'
`