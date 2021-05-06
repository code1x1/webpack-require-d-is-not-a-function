import * as ng from 'angular'
import './atom.scss'

export class AtomController implements ng.IController {
    public static $inject: string[] = []

    public modifier: 'bodytext-bold' | 'bodytext-secondary' | 'bodytext' | 'display' | 'headline' | 'route'
        | 'subheadline-as-newline' | 'subheadline' | 'asterisk-note' | 'warning'  | 'information-header-node'
        | 'information-text-node' | ''
    public disabled: boolean;
    public required: boolean;
    public stroke: boolean;
    public underline: boolean;

    public $onInit(): void {
        this.modifier = this.modifier || ''
        this.stroke = this.stroke || false
        this.disabled = this.disabled || false
        this.underline = this.underline || false
    }
}

export class AtomComponent implements ng.IComponentOptions {
    public transclude = true;
    public bindings = {
        disabled: '<?',
        modifier: '@?',
        required: '<?',
        stroke: '<?',
        underline: '<?'
    };
    public template = require('./atom.html')
    public controller =  AtomController
}
