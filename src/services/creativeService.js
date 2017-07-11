import fetch from '../utils/fetch';

export default {
    queryCreativeTemplateList: async (slotTplId) => {
        const request = {
            url: '/api/query_queryCreativeTemplateList',
            data: {
                slotTemplateId: slotTplId
            }
        };

        const data = await fetch(request);
        return data;
    },

    queryCreativeTemplateInfo: async (creativeTplId) => {
        const request = {
            url: '/api/query_queryCreativeTemplateInfo',
            data: {
                creativeTemplateId: creativeTplId
            }
        };

        const data = await fetch(request);
        return data;
    },

    queryBackground: async (creativeTemplateId) => {
        const request = {
            url: '/api/query_queryBackground',
            data: {
                creativeTemplateId
            }
        };

        const data = await fetch(request);
        return data;
    },

    queryRestrictRules: async () => {
        const request = {
            url: '/api/query_queryRestrictRules'
        };

        const data = await fetch(request);
        return data;
    },

    queryCategory: async (templateElementId) => {
        const request = {
            url: '/api/query_queryCategory',
            data: {
                templateElementId
            }
        };

        const data = await fetch(request);
        return data;
    },

    queryImgResource: async (categoryData) => {
        const request = {
            url: '/api/query_queryImgResource',
            data: categoryData
        };

        const data = await fetch(request);
        return data;
    }
};
