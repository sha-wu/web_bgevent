$(function() {
    // 点击 去注册账号 的链接
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击 去登录 的链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从layui中获取 form对象

    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        'pwd': [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd != value) {
                return '两次密码不一致!'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() };
        $.post('/api/reguser', data,
            function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                } else {
                    layer.msg('注册成功！请登录')
                }
                $('#link_login').click();
            })
    })

    // 监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                } else {
                    layer.msg('登录成功！')
                        // console.log(res.token);
                        // 将登录成功得到的字符串 token 保存到 localStorage
                    localStorage.setItem('token', res.token)
                    location.href = '/index.html';
                }
            }

        })
    })
})





// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcwMzgsInVzZXJuYW1lIjoic2hhd3UiLCJwYXNzd29yZCI6IiIsIm5pY2tuYW1lIjoiIiwiZW1haWwiOiIiLCJ1c2VyX3BpYyI6IiIsImlhdCI6MTYyMzEyNDQyOCwiZXhwIjoxNjIzMTYwNDI4fQ.Dz2xYE1URdw5MA0MUxzKph67-zSKJEv2tjmsVSi64Fg