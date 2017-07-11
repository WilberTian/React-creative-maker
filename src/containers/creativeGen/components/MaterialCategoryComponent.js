import React, { PureComponent } from 'react';
import cx from 'classnames';
import { Collapse } from 'antd';

import DomainMapper from '../../../utils/DomainMapper';

const mapper = {
    modelMapper: (model) => {
        return {
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
    constructor(props) {
        super(props);
        this.state = {
            selectedSubCategory: ''
        };
    }

    componentWillMount() {
        this._queryCategoryList();
    }

    async _queryCategoryList() {
        const { queryCategory, templateElementId } = this.props;
        await queryCategory(templateElementId);
    }

    async _queryImgResource(subCategoryId) {
        this.setState({
            selectedSubCategory: subCategoryId
        });

        const { queryImgResource, setMaterialImgList, templateElementId } = this.props;
        const result = await queryImgResource(templateElementId, subCategoryId);
        setMaterialImgList(result.list);
    }

    render() {
        const Panel = Collapse.Panel;
        const { categoryList } = this.props;
        const categoryComps = [];
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        categoryList.forEach((category) => {
            const subCategoryComps = [];
            category.children.forEach((child) => {
                const subCategoryClass = cx({
                    'sub-category-item': true,
                    active: child.value === this.state.selectedSubCategory
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
        /* eslint-enable jsx-a11y/no-static-element-interactions */
        return (
            <div className="material-category-component">
                <Collapse accordion>
                    {categoryComps}
                </Collapse>
            </div>
        );
    }
}
