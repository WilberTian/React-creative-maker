import indexPage from '../pages/index';

if (process.env.NODE_ENV !== 'production') {
    window.Perf = require('react-addons-perf');
}

indexPage();
console.log(process.env.NODE_ENV);
if (module.hot) {
    module.hot.accept('../pages/index', () => {
        const _new = require('../pages/index').default;
        _new();
    });
}
