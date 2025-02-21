export function generatePluginPath(plugin) {
    return location.origin + location.pathname + plugin;
}
export const officialPlugins = [
    {
        name: 'Type Designer',
        src: 'https://sprinteins.github.io/oscd-plugins/type-designer/index.js',
        icon: 'design_services',
        activeByDefault: true,
        kind: 'editor',
    },
    {
        name: 'Auto doc',
        src: 'https://sprinteins.github.io/oscd-plugins/auto-doc/index.js',
        icon: 'clarify',
        activeByDefault: true,
        kind: 'editor',
    },
    {
        name: 'I/O Center',
        src: 'https://sprinteins.github.io/oscd-plugins/io-center/index.js',
        icon: 'linked_services',
        activeByDefault: true,
        kind: 'editor',
    },
    {
        name: 'IED',
        src: generatePluginPath('plugins/src/editors/IED.js'),
        icon: 'developer_board',
        activeByDefault: true,
        kind: 'editor',
        requireDoc: true,
    },
    {
        name: 'Communication Explorer',
        src: 'https://sprinteins.github.io/oscd-plugins/communication-explorer/index.js',
        icon: 'edit',
        activeByDefault: true,
        kind: 'editor',
    },
    {
        name: 'Network Explorer',
        src: 'https://sprinteins.github.io/oscd-plugins/network-explorer/index.js',
        icon: 'lan',
        activeByDefault: true,
        kind: 'editor',
    },
    {
        name: 'Type Switcher',
        src: 'https://sprinteins.github.io/oscd-plugins/type-switcher/index.js',
        icon: 'edit',
        activeByDefault: true,
        kind: 'editor',
    },
    {
        name: 'Documentation',
        src: 'https://sprinteins.github.io/oscd-plugins/documentation/index.js',
        icon: 'edit',
        activeByDefault: true,
        kind: 'editor',
    },
    {
        name: 'Template Generator',
        src: 'https://sprinteins.github.io/oscd-template-generator/oscd-template-generator.js',
        icon: 'account_tree',
        activeByDefault: true,
        kind: 'editor',
    },
    {
        name: 'Substation',
        src: generatePluginPath('plugins/src/editors/Substation.js'),
        icon: 'margin',
        activeByDefault: true,
        kind: 'editor',
        requireDoc: true,
    },
    {
        name: 'Single Line Diagram',
        src: generatePluginPath('plugins/src/editors/SingleLineDiagram.js'),
        icon: 'edit',
        activeByDefault: false,
        kind: 'editor',
        requireDoc: true,
    },
    {
        name: 'Subscriber Message Binding (GOOSE)',
        src: generatePluginPath('plugins/src/editors/GooseSubscriberMessageBinding.js'),
        icon: 'link',
        activeByDefault: false,
        kind: 'editor',
        requireDoc: true,
    },
    {
        name: 'Subscriber Data Binding (GOOSE)',
        src: generatePluginPath('plugins/src/editors/GooseSubscriberDataBinding.js'),
        icon: 'link',
        activeByDefault: false,
        kind: 'editor',
        requireDoc: true,
    },
    {
        name: 'Subscriber Later Binding (GOOSE)',
        src: generatePluginPath('plugins/src/editors/GooseSubscriberLaterBinding.js'),
        icon: 'link',
        activeByDefault: true,
        kind: 'editor',
        requireDoc: true,
    },
    {
        name: 'Subscriber Message Binding (SMV)',
        src: generatePluginPath('plugins/src/editors/SMVSubscriberMessageBinding.js'),
        icon: 'link',
        activeByDefault: false,
        kind: 'editor',
        requireDoc: true,
    },
    {
        name: 'Subscriber Data Binding (SMV)',
        src: generatePluginPath('plugins/src/editors/SMVSubscriberDataBinding.js'),
        icon: 'link',
        activeByDefault: false,
        kind: 'editor',
        requireDoc: true,
    },
    {
        name: 'Subscriber Later Binding (SMV)',
        src: generatePluginPath('plugins/src/editors/SMVSubscriberLaterBinding.js'),
        icon: 'link',
        activeByDefault: true,
        kind: 'editor',
        requireDoc: true,
    },
    {
        name: 'Communication',
        src: generatePluginPath('plugins/src/editors/Communication.js'),
        icon: 'settings_ethernet',
        activeByDefault: true,
        kind: 'editor',
        requireDoc: true,
    },
    {
        name: '104',
        src: generatePluginPath('plugins/src/editors/Protocol104.js'),
        icon: 'settings_ethernet',
        activeByDefault: false,
        kind: 'editor',
        requireDoc: true,
    },
    {
        name: 'Templates',
        src: generatePluginPath('plugins/src/editors/Templates.js'),
        icon: 'copy_all',
        activeByDefault: true,
        kind: 'editor',
        requireDoc: true,
    },
    {
        name: 'Publisher',
        src: generatePluginPath('plugins/src/editors/Publisher.js'),
        icon: 'publish',
        activeByDefault: false,
        kind: 'editor',
        requireDoc: true,
    },
    {
        name: 'Cleanup',
        src: generatePluginPath('plugins/src/editors/Cleanup.js'),
        icon: 'cleaning_services',
        activeByDefault: false,
        kind: 'editor',
        requireDoc: true,
    },
    {
        name: 'Open project',
        src: generatePluginPath('plugins/src/menu/OpenProject.js'),
        icon: 'folder_open',
        activeByDefault: true,
        kind: 'menu',
        requireDoc: false,
        position: 'top',
    },
    {
        name: 'New project',
        src: generatePluginPath('plugins/src/menu/NewProject.js'),
        icon: 'create_new_folder',
        activeByDefault: true,
        kind: 'menu',
        requireDoc: false,
        position: 'top',
    },
    {
        name: 'Plugin Store (Beta)',
        src: 'https://sprinteins.github.io/oscd-plugin-store/index.js',
        icon: 'shopping_bag',
        activeByDefault: false,
        kind: 'menu',
        requireDoc: false,
        position: 'bottom',
    },
    {
        name: 'Save project',
        src: generatePluginPath('plugins/src/menu/SaveProject.js'),
        icon: 'save',
        activeByDefault: true,
        kind: 'menu',
        requireDoc: true,
        position: 'top',
    },
    {
        name: 'Validate Schema',
        src: generatePluginPath('plugins/src/validators/ValidateSchema.js'),
        icon: 'rule_folder',
        activeByDefault: true,
        kind: 'validator',
    },
    {
        name: 'Validate Templates',
        src: generatePluginPath('plugins/src/validators/ValidateTemplates.js'),
        icon: 'rule_folder',
        activeByDefault: true,
        kind: 'validator',
    },
    {
        name: 'Import IEDs',
        src: generatePluginPath('plugins/src/menu/ImportIEDs.js'),
        icon: 'snippet_folder',
        activeByDefault: true,
        kind: 'menu',
        requireDoc: true,
        position: 'middle',
    },
    {
        name: 'Create Virtual IED',
        src: generatePluginPath('plugins/src/menu/VirtualTemplateIED.js'),
        icon: 'developer_board',
        activeByDefault: false,
        kind: 'menu',
        requireDoc: true,
        position: 'middle',
    },
    {
        name: 'Subscriber Update',
        src: generatePluginPath('plugins/src/menu/SubscriberInfo.js'),
        activeByDefault: true,
        kind: 'menu',
        requireDoc: true,
        position: 'middle',
    },
    {
        name: 'Update desc (ABB)',
        src: generatePluginPath('plugins/src/menu/UpdateDescriptionABB.js'),
        activeByDefault: false,
        kind: 'menu',
        requireDoc: true,
        position: 'middle',
    },
    {
        name: 'Update desc (SEL)',
        src: generatePluginPath('plugins/src/menu/UpdateDescriptionSEL.js'),
        activeByDefault: false,
        kind: 'menu',
        requireDoc: true,
        position: 'middle',
    },
    {
        name: 'Merge Project',
        src: generatePluginPath('plugins/src/menu/Merge.js'),
        icon: 'merge_type',
        activeByDefault: true,
        kind: 'menu',
        requireDoc: true,
        position: 'middle',
    },
    {
        name: 'Update Substation',
        src: generatePluginPath('plugins/src/menu/UpdateSubstation.js'),
        icon: 'merge_type',
        activeByDefault: true,
        kind: 'menu',
        requireDoc: true,
        position: 'middle',
    },
    {
        name: 'Compare IED',
        src: generatePluginPath('plugins/src/menu/CompareIED.js'),
        icon: 'compare_arrows',
        activeByDefault: true,
        kind: 'menu',
        requireDoc: true,
        position: 'middle',
    },
    {
        name: 'Show SCL History',
        src: generatePluginPath('plugins/src/menu/SclHistory.js'),
        icon: 'history_toggle_off',
        activeByDefault: true,
        kind: 'menu',
        requireDoc: true,
        position: 'bottom',
    },
    {
        name: 'Help',
        src: generatePluginPath('plugins/src/menu/Help.js'),
        icon: 'help',
        activeByDefault: true,
        kind: 'menu',
        requireDoc: false,
        position: 'bottom',
    },
    {
        name: 'Export Communication Section',
        src: generatePluginPath('plugins/src/menu/ExportCommunication.js'),
        icon: 'sim_card_download',
        activeByDefault: false,
        kind: 'menu',
        requireDoc: true,
        position: 'middle',
    },
    {
        name: 'Plugin Store',
        src: 'https://sprinteins.github.io/oscd-plugin-store/index.js',
        activeByDefault: true,
        kind: 'menu',
        requireDoc: false,
        position: 'bottom',
    },
];
//# sourceMappingURL=plugins.js.map