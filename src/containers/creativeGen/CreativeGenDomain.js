import services from '../../services/creativeService';

const utils = {
    addRestrict4Elements: (elementTree, restrictRules) => {
        const root = elementTree.containElement;
        const children = root.elementList;

        const updateElements = (elements, _restrictRules) => {
            elements.forEach((element) => {
                if (element.field in _restrictRules) {
                    if (element.type === 'TemplateTextComponent') {
                        element.attrs = { ...element.attrs, colors: _restrictRules[element.field].fontColor };
                        element.css = { ...element.css, color: _restrictRules[element.field].fontColor[0] };
                    }
                }

                if (element.elementList.length > 0) {
                    updateElements(element.elementList, _restrictRules);
                }
            });
        };

        updateElements(children, restrictRules);

        return elementTree;
    }
};

const domain = {

    model: {
        slotInfo: {},
        creativeTplList: [],
        choosenCreativeTplId: null,
        choosenCreativeTplItem: null,
        bgImgList: [],
        bgItem: null,
        categoryList: []
    },

    action: {
        queryCreativeTemplateList: async (slotTplId) => {
            const result = await services.queryCreativeTemplateList(slotTplId);
            const selectedCreativeTplItem = await services.queryCreativeTemplateInfo(result.selectedCreativeTemplateId);
            const restrictRules = await services.queryRestrictRules();


            domain.dispatch({
                ...domain.model,
                creativeTplList: result.list,
                choosenCreativeTplId: result.selectedCreativeTemplateId,
                choosenCreativeTplItem: utils.addRestrict4Elements(selectedCreativeTplItem.info, restrictRules.rules),
                slotInfo: {
                    slotName: result.slotName,
                    creativeTemplatePix: result.creativeTemplatePix
                }
            });
        },

        queryCreativeTemplateInfo: async (creativeTplId) => {
            const result = await services.queryCreativeTemplateInfo(creativeTplId);
            const restrictRules = await services.queryRestrictRules();

            domain.dispatch({
                ...domain.model,
                choosenCreativeTplId: creativeTplId,
                choosenCreativeTplItem: utils.addRestrict4Elements(result.info, restrictRules.rules),
                restrictRules: restrictRules.rules
            });
        },

        queryBackground: async () => {
            const result = await services.queryBackground(domain.model.choosenCreativeTplId);
            const found = result.list.find((bgItem) => {
                return bgItem.id === domain.model.choosenCreativeTplItem.containElement.attrs.bgImgId;
            });

            domain.dispatch({
                ...domain.model,
                bgImgList: result.list,
                bgItem: found
            });
        },

        chooseBackground: (bgItem) => {
            domain.dispatch({
                ...domain.model,
                bgItem
            });
        },

        updateCreativeData: (elementId, key, value) => {
            const temp = JSON.parse(JSON.stringify(domain.model.choosenCreativeTplItem));
            if (elementId === 0) {
                temp.containElement[key] = value;
            } else {
                const childrenElements = temp.containElement.elementList;
                const found = childrenElements.find((element) => {
                    return element.elementId === elementId;
                });

                if (found) {
                    found[key] = value;
                }
            }

            domain.dispatch({
                ...domain.model,
                choosenCreativeTplItem: temp
            });
        },

        queryRestrictRules: async () => {
            const result = await services.queryRestrictRules();

            domain.dispatch({
                ...domain.model,
                choosenCreativeTplItem: utils.addRestrict4Elements(domain.model.choosenCreativeTplItem,
                    result.rules)
            });
        },

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
                categoryId: subCategoryId
            });

            return result;
        }
    }
};

export default domain;
