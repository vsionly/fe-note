/*
 * 实现file对象在img标签中展示
 */
const file = '文件对象'

//  1、 通过 base64 假设file 是上传的文件对象

var reader = new FileReader();
reader.readAsDataURL(file.raw);
var imageSrc = '图片的src属性'

reader.onload = e => {
    console.log(reader.result, 9)
    imageSrc = reader.result
}

// 2、 通过 base64 假设file 是上传的文件对象
URL.createObjectURL(file.raw);
img.onload = function (e) {
    URL.revokeObjectURL(img.src); // 图片加载后 要清楚内存的数据
};
以blob开头的地址。以window.URL.createObjectURL()这种方式每次 需要使用revokeObjectURL释放URL对象。

***************************************************************************************************
/*
 * 实现img标签转base64
 */
const image = '图片元素'

let canvas = document.createElement('canvas');
canvas.width = image.width;
canvas.height = image.height;
let context = canvas.getContext('2d');
context.drawImage(image, 0, 0, image.width, image.height);
let quality = 0.8; //清晰度
// 这里的dataurl就是base64类型
let dataURL = canvas.toDataURL('image/jpeg', quality);
