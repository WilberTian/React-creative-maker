import React, { PureComponent } from 'react';

import './color-list-component.less';

export default class ColorListComponent extends PureComponent {
    static defaultProps = {
        onChange: () => {

        }
    };

    _changeColor(color) {
        const { onChange } = this.props;
        onChange(color);
    }

    render() {
        const { colors } = this.props;

        /* eslint-disable jsx-a11y/no-static-element-interactions */
        return (
            <div className="color-list-component">
                { colors.map((color, index) => {
                    return (<div
                      className="color-item"
                      style={{ backgroundColor: color }}
                      key={index}
                      onClick={() => {
                          this._changeColor(color);
                      }}
                    />);
                })}
            </div>
        );
        /* eslint-enable jsx-a11y/no-static-element-interactions */
    }
}
