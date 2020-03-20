import { moduleMetadata } from '@storybook/angular';
import { LayoutModule, HeaderBarComponent, YzYAction, YzYActionTypes } from 'yzy-ng';
import { action } from '@storybook/addon-actions';

export default {
    title: 'Layout',
    decorators: [
        moduleMetadata({
            imports: [LayoutModule]
        })
    ]
};
const actions: YzYAction[] = [
    { name: 'save', class: 'gg-check', type: YzYActionTypes.Warning },
    { name: 'add', class: 'gg-math-plus', type: YzYActionTypes.Success },
    { name: 'back', class: 'gg-chevron-left', type: YzYActionTypes.Info },
    { name: 'alert', class: 'gg-bell', type: YzYActionTypes.Error },
    { name: 'attachment', class: 'gg-attachment', type: YzYActionTypes.Default },
    { name: 'saveDisabled', class: 'gg-check', type: YzYActionTypes.Warning, disabled: true },
];
export const headerBar = () => ({
    component: HeaderBarComponent,
    template: `
    <div class="demo-desktop">
    <yzy-header-bar [title]="title"></yzy-header-bar>
    </div>
    `,
    props: {
        title: 'Liste des membres'
    }
});
export const headerBarWithActions = () => ({
    component: HeaderBarComponent,
    template: `
    <div class="demo-desktop">
    <yzy-header-bar [title]="title" [actions]="actions" (action)="action($event)"></yzy-header-bar>
    </div>
    `,
    props: {
        title: 'Liste des membres',
        actions,
        action: action('action')
    }
});
