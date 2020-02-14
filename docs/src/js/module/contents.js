Jet.define('Content', function () {
    var contents = [
        '介绍', '安装使用', 'api目录', '更新日志', '关于',
        'cnchar主库', '绑定(属性J)', '$init', '绑定的分类', '绑定的语法', '数组方法',
        'cnchar-poly', 'jif:条件判断', 'jshow:选择展示', 'jattr:绑定属性', 'jstyle:绑定样式', 'jrun:执行回调', 'jon:绑定事件', 'jload:组件', 'jroot:根数据', 'jdom:操作DOM', 'jhtml:渲染HTML', 'jpath:路径机制',
        'cnchar-order', '官方库和第三方库', 'babel', 'less', 'use/use.all方法', '定义库和依赖',
        
        'cnchar-trad', 'jvalid', 'jform', 'Jet.valid 方法', '自定义样式',
        'cnchar-all', 'use()', '静态', '动态', 'Jet.lang.list', 'Jet.lang.type', 'Jet.lang.init',
        '在线使用'
    ];
    var urls = [
        '/intro', '/intro/install', '/intro/api', '/intro/update', '/intro/about',
        '/cnchar', '/cnchar/spell', '/cnchar/init', '/cnchar/type', '/cnchar/grammer', '/cnchar/array',
        '/attr', '/attr/if', '/attr/show', '/attr/attr', '/attr/style', '/attr/run', '/attr/on', '/attr/load', '/attr/root', '/attr/dom', '/attr/html', '/attr/path',
        '/lib', '/lib/part', '/lib/babel', '/lib/less', '/lib/use', '/lib/define',

        '/valid', '/valid/valid', '/valid/form', '/valid/method', '/valid/custom',
        '/lang', '/lang/use', '/lang/static', '/lang/dynamic', '/lang/list', '/lang/type', '/lang/init',
        '/code'
    ];
    var length = contents.length;
    var getContentsBetween = function (a1, a2) {
        var i1 = urls.indexOf(a1);
        var i2 = urls.indexOf(a2) + 1;
        var ca = contents.slice(i1, i2);
        var ua = urls.slice(i1, i2);
        var res = {
            children: []
        };
        ca.forEach(function (item, index) {
            if (index == 0) {
                res.name = item;
                res.url = ua[index];
            } else {
                res.children.push({name: item, url: ua[index]});
            }
        });
        return res;
    };
    Jet.export({
        getJumpInfo: function () {
            var currentUrl = Jet.router.url;
            if (Jet.router.url === Jet.router.index) {
                currentUrl = '/intro';
            }
            var index = urls.indexOf(currentUrl);
            if (index == -1) {
                return null;
            }
            var res = {};
            if (index > 0) {
                res.last = contents[index - 1];
                res.lastUrl = urls[index - 1];
            }
            if (index < length - 1) {
                res.next = contents[index + 1];
                res.nextUrl = urls[index + 1];
            }
            return res;
        }, getContentByUrl: function (url) {
            var index = urls.indexOf(url);
            return contents[index];
        }, getContents: function () {
            var s = ['/intro/about', '/cnchar/array', '/attr/path', '/lib/define', '/valid/custom', '/lang/init', '/code'];
            var data = [];
            s.forEach(function (item) {
                if (item == '/code') {
                    data.push(getContentsBetween(item, item));
                } else {
                    data.push(getContentsBetween(item.substring(0, item.lastIndexOf('/')), item));
                }
            });
            return data;
        }
    });
});