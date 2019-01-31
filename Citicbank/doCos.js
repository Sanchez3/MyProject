 var ajax = require('@fdaciuk/ajax');
 function doCos(_file,_name) {
        var that = this;

        var Bucket = 'zxbak-0000000000';
        var Region = 'ap-shanghai';

        var cos = new COS({
            getAuthorization: function(options, callback) {
                //获取cos签名服务
                // var url = '../server/sts.php';
                var url = '/zx/getCosSignature';
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.onload = function(e) {
                    try {
                        var data = JSON.parse(e.target.responseText);
                    } catch (e) {}
                    callback({
                        TmpSecretId: data.credentials && data.credentials.tmpSecretId,
                        TmpSecretKey: data.credentials && data.credentials.tmpSecretKey,
                        XCosSecurityToken: data.credentials && data.credentials.sessionToken,
                        ExpiredTime: data.expiredTime,
                    });
                };
                xhr.send();
            }
        });
        var uploadFile = function(file,name) {
            var now = new Date();
            var Key;
            var Key = deviceT + '-' +name+ '-' + now;
          

            cos.sliceUploadFile({
                Bucket: Bucket,
                Region: Region,
                Key: Key,
                Body: file,
                onHashProgress: function(progressData) {
                    console.log('校验中', JSON.stringify(progressData));
                },
                onProgress: function(progressData) {
                    console.log('上传中', JSON.stringify(progressData));
                },
            }, function(err, data) {
                console.log(err, data);
                var fmsg;
                if (err) {
                    fmsg = err
                } else {
                    fmsg = '备份成功';
                    //将成功上传至cos，返回的location数据返回至服务器做记录
                    // ajax().post('/zx/setImageTrace', { name: _name, path: data.Location }).always(function(response, xhr) {});
                }
                console.log(fmsg)
            });
        }
        uploadFile(_file,_name);
   }
