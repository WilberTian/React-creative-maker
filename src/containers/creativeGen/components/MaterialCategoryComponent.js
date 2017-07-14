import React, { PureComponent } from 'react';
import cx from 'classnames';
import { Collapse } from 'antd';

import DomainMapper from '../../../utils/DomainMapper';

const mapper = {
    modelMapper: (model) => {
        return {
            selectedSubCategory: model.selectedSubCategory,
            categoryList: model.categoryList
        };
    },
    actionMapper: (action) => {
        return {
            queryCategory: action.queryCategory,
            queryImgResource: action.queryImgResource
        };
    }
};

@DomainMapper(mapper)
export default class MaterialCategoryComponent extends PureComponent {
    componentWillMount() {
        this._queryCategoryList();
    }

    async _queryCategoryList() {
        const { queryCategory, templateElementId } = this.props;
        await queryCategory(templateElementId);
    }

    async _queryImgResource(subCategoryId) {
        const { queryImgResource, templateElementId } = this.props;
        await queryImgResource(templateElementId, subCategoryId);
    }
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    render() {
        const Panel = Collapse.Panel;
        const { categoryList, selectedSubCategory } = this.props;
        const categoryComps = [];

        categoryList.forEach((category) => {
            const subCategoryComps = [];
            category.children.forEach((child) => {
                const subCategoryClass = cx({
                    'sub-category-item': true,
                    active: child.value === selectedSubCategory
                });

                subCategoryComps.push(
                    <div
                      className={subCategoryClass}
                      key={child.value}
                      onClick={() => { this._queryImgResource(child.value); }}
                    >
                        {child.text}
                    </div>
                );
            });

            categoryComps.push(<Panel key={category.value} header={category.text}>{subCategoryComps}</Panel>);
        });

        return (
            <div className="material-category-component">
                <Collapse accordion>
                    {categoryComps}
                </Collapse>
            </div>
        );
    }
    /* eslint-enable jsx-a11y/no-static-element-interactions */
}
