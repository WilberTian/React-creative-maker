import React, { PureComponent } from 'react';
import { Tooltip } from 'antd';

import BgImgSelectorComponent from './BgImgSelectorComponent';

import iconBgImage from '../../../images/icon/icon-bg-image.png';
import iconBgColor from '../../../images/icon/icon-bg-color.png';

import './template-container.less';

export default class TemplateContainer extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            bgImgSelectorVisible: false,
            bgColorSelectorVisible: false
        };
    }

    _toggleBgColorSelector() {
        this.setState({
            bgColorSelectorVisible: !this.state.bgColorSelectorVisible
        });
    }

    _toggleBgImgSelector() {
        this.setState({
            bgImgSelectorVisible: !this.state.bgImgSelectorVisible
        });
    }

    _changeTplContainerBg(isImg, bgItem) {
        const { setElementData, queryRestrictRules, css, attrs } = this.props;

        setElementData(0, 'attrs', { ...attrs, bgimgId: bgItem.id });
        setElementData(0, 'css', { ...css,
            background: `url(${bgItem.picUrl})`,
            'background-repeat': 'no-repeat',
            'background-size': 'contain'
        });
        queryRestrictRules();
    }

    render() {
        const { className, children, attrs } = this.props;
        const templateWrapperStyle = { height: attrs.height, width: attrs.width };
        const templateContainerStyle = { transform: `scale(${attrs.scale})`, transformOrigin: 'top left' };


        /* eslint-disable jsx-a11y/no-static-element-interactions */
        return (
            <div className="template-wrapper" style={templateWrapperStyle}>
                <div className="template-bg-btns">
                    <Tooltip title="更改背景颜色">
                        <div className="img-wrapper" onClick={::this._toggleBgColorSelector}>
                            <img src={iconBgColor} alt="background color" />
                        </div>
                    </Tooltip>
                    <Tooltip title="更改背景图片">
                        <div className="img-wrapper" onClick={::this._toggleBgImgSelector}>
                            <img src={iconBgImage} alt="background" />
                        </div>
                    </Tooltip>
                </div>
                <div className={`template-container ${className}`} style={templateContainerStyle}>
                    {children.map((child, index) => {
                        return React.createElement(child, { key: index });
                    })}
                </div>
                { this.state.bgImgSelectorVisible && <BgImgSelectorComponent
                  visible={this.state.bgImgSelectorVisible}
                  toggleVisible={::this._toggleBgImgSelector}
                  changeTplContainerBg={::this._changeTplContainerBg}
                />}
            </div>
        );
        /* eslint-enable jsx-a11y/no-static-element-interactions */
    }
}
