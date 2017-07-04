import React, { PureComponent } from 'react';
import cx from 'classnames';

import DomainMapper from '../../../utils/DomainMapper';

const mapper = {
    modelMapper: (model) => {
        return {
            creativeTplList: model.creativeTplList,
            choosenCreativeTplId: model.choosenCreativeTplId
        };
    },
    actionMapper: (action) => {
        return {
            queryCreativeTemplateInfo: action.queryCreativeTemplateInfo
        };
    }
};

@DomainMapper(mapper)
export default class TplSelectorComponent extends PureComponent {
    _queryCreativeTemplateInfo(tplId) {
        const { queryCreativeTemplateInfo } = this.props;
        queryCreativeTemplateInfo(tplId);
    }

    render() {
        const { creativeTplList, choosenCreativeTplId } = this.props;
        /* eslint-disable jsx-a11y/no-static-element-interactions */
        return (
            <div className="tpl-selector-component">
                <span className="label">
                    创意模板
                </span>
                <div className="tpl-list-wrapper">
                    { creativeTplList.map((creativeTplItem, index) => {
                        const creativeTplClass = cx({
                            'tpl-item': true,
                            active: creativeTplItem.creativeTemplateId === choosenCreativeTplId
                        });

                        return (
                            <div className={creativeTplClass} key={index} onClick={() => {
                                this._queryCreativeTemplateInfo(creativeTplItem.creativeTemplateId);
                            }}
                            >
                                <img alt="" src={creativeTplItem.demo} />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
        /* eslint-enable jsx-a11y/no-static-element-interactions */
    }
}
