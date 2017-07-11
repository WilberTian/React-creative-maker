import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Tooltip } from 'antd';

import DomainMapper from '../../../utils/DomainMapper';

import TemplateContainer from './TemplateContainer';
import TemplateImageComponent from './TemplateImageComponent';
import TemplateMaterialComponent from './TemplateMaterialComponent';
import TemplateTextComponent from './TemplateTextComponent';

const mapper = {
    modelMapper: (model) => {
        return {
            choosenCreativeTplItem: model.choosenCreativeTplItem,
            slotInfo: model.slotInfo,
            restrictRules: model.restrictRules
        };
    },
    actionMapper: (action) => {
        return {
            updateCreativeData: action.updateCreativeData,
            queryRestrictRules: action.queryRestrictRules
        };
    }
};

@DomainMapper(mapper)
export default class CreativeDesignComponent extends PureComponent {
    constructor(props) {
        super(props);

        this.tplElementMapper = {
            TemplateContainer,
            TemplateImageComponent,
            TemplateMaterialComponent,
            TemplateTextComponent
        };
    }

    _generateChildrenElements(childrenElements) {
        const { updateCreativeData, restrictRules } = this.props;
        const childrenComponents = [];

        childrenElements.forEach((element) => {
            const StyledElementComponent = styled(this.tplElementMapper[element.type])
                .attrs({
                    elementId: element.elementId,
                    attrs: element.attrs,
                    css: element.css,
                    setElementData: () => {
                        return updateCreativeData || function () {};
                    },
                    children: this._generateChildrenElements(element.elementList)
                })`
                    ${element.css}
                `;

            childrenComponents.push(StyledElementComponent);
        });

        return childrenComponents;
    }

    _generateTemplateContainer() {
        const { choosenCreativeTplItem, updateCreativeData, queryRestrictRules } = this.props;

        const containElement = choosenCreativeTplItem.containElement;
        const childrenComponents = this._generateChildrenElements(containElement.elementList);

        const TplContainer = styled(this.tplElementMapper[containElement.type]).attrs({
            elementId: containElement.elementId,
            attrs: containElement.attrs,
            css: containElement.css,
            setElementData: () => {
                return updateCreativeData || function () {};
            },
            queryRestrictRules: () => {
                return queryRestrictRules || function () {};
            },
            children: childrenComponents
        })`
            ${containElement.css}
        `;

        return TplContainer;
    }

    render() {
        const { slotInfo, choosenCreativeTplItem } = this.props;

        const TplContainer = choosenCreativeTplItem ?
            this._generateTemplateContainer() :
            () => {
                return (<div>选择模板开始制作创意吧！</div>);
            };

        return (
            <div className="creative-design-component">
                <span className="label">
                    创意设计
                </span>
                <div className="creative-design-viewer">
                    <TplContainer />
                    <span className="template-size-info">
                        尺寸{slotInfo.creativeTemplatePix}
                    </span>
                </div>
            </div>
        );
    }
}
