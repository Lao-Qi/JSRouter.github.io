const siteTitle = "JS原生路由切换";

// 前端所有的路由
const routers = {
    '404': {
        page: '/pages/404.html',
        title: `404 | ${siteTitle}`,
        description: "Page not found"
    },
    '/' : {
        page: '/pages/home.html',
        title: `Home | ${siteTitle}`,
        description: "Home Page"
    },
    '/about': {
        page: '/pages/about.html',
        title: `About | ${siteTitle}`,
        description: "About Page"
    },
    '/contact': {
        page: '/pages/contact.html',
        title: `Contact | ${siteTitle}`,
        description: "Contact Page"
    },
    '/services': {
        page: '/pages/services.html',
        title: `Services | ${siteTitle}`,
        description: "Services Page"
    }
}




// 事件代理，取消nav下所有a标签的点击事件
document.querySelector('nav').addEventListener('click', (e) => {
    if(e.target.matches('a')) {
        e.preventDefault();
        useRoute(e)
    }
})

/**
 * @inheritdoc 阻止浏览器访问链接，并执行渲染模板函数
 * @param {Event} e 
 */
const useRoute = (e) => {
    // 不让浏览器响应URL页面，如果有对于连接执行我们的代码
    history.pushState({
        // 内部属性可以自己添加，没有限制
        outPage: window.location.pathname,
    }, '', e?.target?.href || window.location.pathname);
    // 渲染页面函数
    renderPage();
}



// 渲染模板
const renderPage = async () => {
    console.log(1);
    // 页面地址
    const location = window.location.pathname;
    // 获取对应信息，如果没有返回404页面信息
    const router = routers[location] || routers['404'];
    // 获取对应页面模板内容
    const data = await (await fetch(router.page)).text();

    // 导入模板，修改对应信息
    document.title = router.title;
    document.querySelector('#root').innerHTML = data;
    document
        .querySelector('meta[name="description"]')
        .setAttribute('content', router.description)
}

// 前进或后退时，在次渲染模板
window.onpopstate = renderPage;
window.useRoute = useRoute;
useRoute();
