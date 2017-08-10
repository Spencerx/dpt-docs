import React from 'react';
import Highlight from 'react-highlight';
import block from 'propmods';

import '../../../vendor/beast';

import Spinner from '../Spinner';
import Cut from '../Cut';

if (process.env.BROWSER) {
    var cookie = require('cookie_js').cookie;
    require('./WExample.less');
    require('./github.css');

    document.addEventListener('DOMContentLoaded', maintainScroll);
}

const b = block('WExample');

function maintainScroll() {
    let previousScroll = cookie.get('scrollPosition');
    if (previousScroll) {
        window.scrollTo(window.scrollX, previousScroll);
    }
}

export default class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false
        };
    }

    componentDidMount() {
        if (!this.props.src) {
            let node = eval(Beast.parseBML(this.props.code));
            this.setState({
                loaded: true
            });

            let dom = this.refs.example;

            node.render(dom);

            setTimeout(maintainScroll, 0);
        }
    }

    render() {
        const props = this.props;
        let parts = props.lang.split('_');
        let [lang, modName, modValue = true] = parts;

        let mods = (modName = { [modName]: modValue });

        let style = {
            width: props.width,
            height: props.height
        };

        let result;

        const language = props.lang === 'bml' ? 'language-html' : `language-${props.lang}`;

        if (props.src) {
            let src = props.src + '?platform=' + props.platform;
            result = (
                <div {...b(this)}>
                    <iframe {...b('content')} src={src} style={style} ref="example" />
                </div>
            );
        } else {
            result = (
                <div {...b(this, mods)}>
                    <div {...b('preloader')}>
                        <Spinner />
                    </div>
                    <div {...b('content')} style={style} ref="example" />
                    <div {...b('code')}>
                        <Cut title="Code">
                            <div {...b('code-content')}>
                                <Highlight className={language}>
                                    {props.code}
                                </Highlight>
                            </div>
                        </Cut>
                    </div>
                </div>
            );
        }

        return result;
    }
}
