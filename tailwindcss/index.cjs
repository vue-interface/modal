const Color = require('color');
const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');

module.exports = plugin(function({ addComponents, matchComponents, theme }) {
    addComponents(theme('modal.css'));

    matchComponents({
        'modal': maxWidth => ({
            '.modal-dialog': {
                maxWidth
            }
        })
    }, {
        values: theme('modal.sizes')
    });
}, {
    theme: {
        modal: theme => ({
            css: {
                // Container that the modal scrolls within
                '.modal': {
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 500,
                    display: 'none',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    outline: 0,
        
                    '.modal-open &': {
                        overflow: 'hidden',
        
                        '.modal': {
                            overflowX: 'hidden',
                            overflowY: 'auto'
                        }
                    },
        
                    '.modal-dialog': {
                        position: 'relative',
                        width: 'auto',
                        margin: '.5rem',
                        pointerEvents: 'none',
                        zIndex: 2
                    },
                
                    '&.fade .modal-dialog': {
                        transition: 'transform .3s ease-out, opacity .3s ease-out',
                        transform: 'translate(0, calc(-100% - 50px))',
                    },
            
                    '&.show .modal-dialog': {
                        transform: 'none'
                    },
            
                    '&.modal-static .modal-dialog': {
                        transform: 'scale(1.02)'
                    },
            
                    '.modal-dialog-scrollable': {
                        maxHeight: 'calc(100% - 1rem)',
                    },
            
                    '.modal-body': {
                        overflowY: 'auto'
                    },
            
                    '.modal-dialog-centered': {
                        display: 'flex',
                        alignItems: 'center',
                        minHeight: 'calc(100% - 1rem)',
                    },
            
                    '.modal-content': {
                        overflow: 'hidden',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        color: theme('colors.stone.800', colors.stone[800]),
                        pointerEvents: 'auto',
                        backgroundColor: theme('colors.white', colors.white),
                        backgroundClip: 'padding-box',
                        border: `1px solid ${theme('colors.stone.500', colors.stone[500])}`,
                        borderRadius: '.3rem',
                        boxShadow: '0 .5rem 1rem rgba(0, 0, 0, .25)',
                        outline: 0,

                        '@apply dark:text-stone-200': {},
                        '@apply dark:bg-stone-800': {},
                        '@apply dark:border-stone-700': {}
                    },
            
                    '.modal-backdrop': {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        zIndex: 1,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: theme('colors.neutral.900', colors.neutral[900]),
                    },
            
                    '.modal-backdrop.fade': {
                        opacity: 0,
                        transition: 'transform .3s ease-out, opacity .3s ease-out'
                    },
        
                    '.modal-backdrop.show': { opacity: '.66' },
        
                    '.modal-header': {
                        display: 'flex',
                        flexShrink: 0,
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        padding: '1rem 1rem',
                        borderBottom: `1px solid ${theme('colors.stone.200', colors.stone[200])}`,
                        borderTopLeftRadius: '.25rem',
                        borderTopRightRadius: '.25rem',

                        '@apply dark:border-stone-600': {},
        
                        '.close': {
                            fontSize: '1.25rem',
                            padding: '1rem',
                            margin: '-1rem -1rem -1rem auto'
                        }
                    },
        
                    '.modal-title': {
                        marginBottom: 0,
                        fontSize: '1.5rem',
                        fontWeight: 'normal',
                        lineHeight: 1.5
                    },
        
                    '.modal-body': {
                        position: 'relative',
                        flex: '1 1 auto',
                        padding: '1rem',
                    },
        
                    // Footer (for actions)
                    '.modal-footer': {
                        display: 'flex',
                        flexWrap: 'wrap',
                        flexShrink: 0,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        padding: '.5rem',
                        borderTop: `1px solid ${theme('colors.stone.200', colors.stone[200])}`,
                        borderBottomLeftRadius: '.25rem',
                        gap: '.25rem',

                        '@apply dark:border-stone-600': {},
                    },
                    
                    // Measure scrollbar width for padding body during modal show/hide
                    '.modal-scrollbar-measure': {
                        position: 'absolute',
                        top: '-9999px',
                        width: '50px',
                        height: '50px',
                        overflow: 'scroll',
                    },
        
                    '@screen md': {
                        '.modal-dialog': {
                            margin: '1.75rem auto 0',
                            maxWidth: '500px'
                        },
        
                        '.modal-dialog-scrollable': {
                            maxHeight: 'calc(100% - 3.5rem)'
                        },
        
                        '.modal-dialog-centered': {
                            minHeight: 'calc(100% - 3.5rem)'
                        }
                    }
                },
            },
            sizes: {
                sm: '300px',
                md: '500px',
                lg: '800px',
                xl: '1140px',                    
            }
        })
    }
});