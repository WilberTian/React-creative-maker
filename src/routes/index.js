import App from '../containers/common/App';
import CreativeGenContainer from '../containers/creativeGen/CreativeGenContainer';

import NotFound from './NotFound';

const CreativeGenRoute = {
    path: 'creative-gen/:slotTplId',
    component: CreativeGenContainer
};

const notFountRoute = {
    path: '*',
    component: NotFound,
};

const route = {
    path: '/',
    component: App,
    indexRoute: {
        component: CreativeGenContainer,
    },
    childRoutes: [
        CreativeGenRoute,
        notFountRoute
    ]
};

export default route;
