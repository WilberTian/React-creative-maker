import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import { Breadcrumb, Spin } from 'antd';

import DomainComponentCreator from '../../utils/DomainComponentCreator';
import CreativeGenDomain from './CreativeGenDomain';

import CreativeGenComponent from './components/CreativeGenComponent';

import './creative-gen-container.less';

@DomainComponentCreator(CreativeGenDomain)
export default class CreativeGenContainer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }
    componentWillMount() {
        this._queryCreativeTemplateList();
    }

    async _queryCreativeTemplateList() {
        const { action, params } = this.props;
        await action.queryCreativeTemplateList(params.slotTplId);
        this.setState({
            loading: false
        });
    }

    render() {
        const { model } = this.props;
        return (
            <Spin spinning={this.state.loading}>
                <div className="creative-gen-container">
                    <div className="breadcrumb-wrapper">
                        <Breadcrumb separator=">">
                            <Breadcrumb.Item>我的创意</Breadcrumb.Item>
                            <Breadcrumb.Item>新增创意</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <div className="creative-gen-header">
                        自定义创意：{ model.slotInfo.slotName }
                    </div>
                    <CreativeGenComponent />
                </div>
            </Spin>
        );
    }
}
