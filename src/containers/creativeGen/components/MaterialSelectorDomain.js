import services from '../../../services/creativeService';

const domain = {

    model: {
        selectedSubCategory: null,
        selectedMaterialImg: null,
        categoryList: [],
        materialImgList: []
    },

    action: {
        queryCategory: async (templateElementId) => {
            const result = await services.queryCategory(templateElementId);

            domain.dispatch({
                ...domain.model,
                categoryList: result.list
            });
        },

        queryImgResource: async (templateElementId, subCategoryId) => {
            const result = await services.queryImgResource({
                templateElementId,
                categoryId: subCategoryId,
            });

            domain.dispatch({
                ...domain.model,
                materialImgList: result.list,
                selectedSubCategory: subCategoryId
            });

            return result;
        },

        setSelectedMaterialImg: (materialImg) => {
            domain.dispatch({
                ...domain.model,
                selectedMaterialImg: materialImg
            });
        }
    }
};

export default domain;
