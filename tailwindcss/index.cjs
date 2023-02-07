const Color = require('color');
const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');
// const { flatten, divide, multiply } = require('@vue-interface/tailwindcss/utils');
// const breakpoints = require('@vue-interface/tailwindcss/utils/breakpoints');
// const rgba = require('@vue-interface/tailwindcss/utils/rgba');

module.exports = plugin(function({ addComponents, theme }) {
    const modal = {
        // .modal-open      - body class for killing the scroll
        // .modal           - container to scroll within
        // .modal-dialog    - positioning shell for the actual modal
        // .modal-content   - actual modal w/ bg and corners and stuff
        '.modal-open': {
            // Kill the scroll on the body
            overflow: 'hidden',

            '.modal': {
                overflowX: 'hidden',
                overflowY: 'auto'
            }
        },

        // Container that the modal scrolls within
        '.modal': {
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: theme('modal.zIndex'),
            display: 'none',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            // Prevent Chrome on Windows from adding a focus outline. For details, see
            // https://github.com/twbs/bootstrap/pull/10951.
            outline: 0,
            // We deliberately don't use `-webkit-overflow-scrolling: touch;` due to a
            // gnarly iOS Safari bug: https://bugs.webkit.org/show_bug.cgi?id=158342
            // See also https://github.com/twbs/bootstrap/issues/17695
        },

        // Shell div to position the modal with bottom padding
        '.modal-dialog': {
            position: 'relative',
            width: 'auto',
            margin: theme('modal.dialog.margin'),
            // allow clicks to pass through for custom click handling to close modal
            pointerEvents: 'none',
            zIndex: theme('modal.dialog.zIndex')
        },
        
        // When fading in the modal, animate it to slide down
        '.modal.fade .modal-dialog': {
            transition: theme('modal.transition'),
            transform: theme('modal.transform.fade'),
        },

        '.modal.show .modal-dialog': {
            transform: theme('modal.transform.show')
        },

        // When trying to close, animate focus to scale
        '.modal.modal-static .modal-dialog': {
            transform: theme('modal.transform.scale')
        },

        '.modal-dialog-scrollable': {
            maxHeight: `calc(100% - ${theme('modal.dialog.margin')} * 2)`,
        },

        '.modal-body': {
            overflowY: 'auto'
        },

        '.modal-dialog-centered': {
            display: 'flex',
            alignItems: 'center',
            minHeight: `calc(100% - ${theme('modal.dialog.margin')} * 2)`,
        },

        // Actual modal
        '.modal-content': {
            overflow: 'hidden',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            width: '100%', // Ensure `.modal-content` extends the full width of the parent `.modal-dialog`
            // counteract the pointer-events: none; in the .modal-dialog
            color: theme('modal.content.color'),
            pointerEvents: 'auto',
            backgroundColor: theme('modal.content.backgroundColor'),
            backgroundClip: 'padding-box',
            border: `${theme('modal.content.borderWidth')} solid ${theme('modal.content.borderColor')}`,
            borderRadius: theme('modal.content.borderRadius'),
            boxShadow: theme('modal.content.xs.boxShadow'),
            // Remove focus outline from opened modal
            outline: 0
        },

        // Modal background
        '.modal-backdrop': {
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: theme('modal.backdrop.zIndex'),
            width: '100vw',
            height: '100vh',
            backgroundColor: theme('modal.backdrop.backgroundColor'),
        },

        // Fade for backdrop
        '.modal-backdrop.fade': {
            opacity: 0,
            transition: theme('modal.transition')
        },

        '.modal-backdrop.show': { opacity: theme('modal.backdrop.opacity') },

        // Modal header
        // Top section of the modal w/ title and dismiss
        '.modal-header': {
            display: 'flex',
            flexShrink: 0,
            alignItems: 'flex-start', // so the close btn always stays on the upper right corner
            justifyContent: 'space-between', // Put modal header elements (title and dismiss) on opposite ends
            padding: theme('modal.header.padding'),
            borderBottom: `${theme('modal.header.borderWidth')} solid ${theme('modal.header.borderColor')}`,
            borderTopLeftRadius: theme('modal.content.inner.borderRadius'),
            borderTopRightRadius: theme('modal.content.inner.borderRadius'),
        },

        '.modal-header .close': {
            fontSize: theme('modal.header.fontSize'),
            padding: theme('modal.header.padding'),
            // auto on the left force icon to the right even when there is no .modal-title
            margin: `-${theme('modal.header.paddingY')} -${theme('modal.header.paddingX')} -${theme('modal.header.paddingY')} auto`
        },

        // Title text within header
        '.modal-title': {
            marginBottom: 0,
            fontSize: theme('modal.header.fontSize'),
            fontWeight: theme('modal.title.fontWeight'),
            lineHeight: theme('modal.title.lineHeight')
        },

        // Modal body
        // Where all modal content resides (sibling of .modal-header and .modal-footer)
        '.modal-body': {
            position: 'relative',
            // Enable `flex-grow: 1` so that the body take up as much space as possible
            // when there should be a fixed height on `.modal-dialog`.
            flex: '1 1 auto',
            padding: theme('modal.inner.padding')
        },

        // Footer (for actions)
        '.modal-footer': {
            display: 'flex',
            flexWrap: 'wrap',
            flexShrink: 0,
            alignItems: 'center', // vertically center
            justifyContent: 'flex-end', // Right align buttons with flex property because text-align doesn't work on flex items
            padding: `calc(${theme('modal.inner.padding')} - ${theme('modal.footer.marginBetween')} / 2)`,
            borderTop: `${theme('modal.footer.borderWidth')} solid ${theme('modal.footer.borderColor')}`,
            borderBottomLeftRadius: theme('modal.content.inner.borderRadius'),
        },

        // Place margin between footer elements
        // This solution is far from ideal because of the universal selector usage,
        // but is needed to fix https://github.com/twbs/bootstrap/issues/24800
        '.modal-footer > *': {
            margin: `calc(${theme('modal.footer.marginBetween')} / 2)`
        },

        // Measure scrollbar width for padding body during modal show/hide
        '.modal-scrollbar-measure': {
            position: 'absolute',
            top: '-9999px',
            width: '50px',
            height: '50px',
            overflow: 'scroll',
        },
    };

    Object.assign(modal, {
        // Automatically set modal's width for larger viewports
        [`@media only screen and (min-height: ${theme('modal.sm')})`]: {
            '.modal-dialog': {
                maxWidth: theme('modal.md'),
                margin: `${theme('modal.dialog.up.marginY')} auto`,
            },

            '.modal-dialog-scrollable': {
                maxHeight: `calc(100% - ${theme('modal.dialog.up.marginY')} * 2)`
            },

            '.modal-dialog-centered': {
                minHeight: `calc(100% - ${theme('modal.dialog.up.marginY')} * 2)`
            },

            '.modal-content': {
                boxShadow: theme('modal.content.up.boxShadow')
            },

            '.modal-sm': { maxWidth: theme('modal.sm') }
        },

        // Scale up the modal
        [`@media only screen and (min-height: ${theme('modal.lg')})`]: {
            '.modal-lg, .modal-xl': { maxWidth: theme('modal.sm') }
        },

        [`@media only screen and (min-height: ${theme('modal.xl')})`]: {
            '.modal-xl': { maxWidth: theme('modal.xl') }
        }
    });

    for(let key of ['sm', 'md', 'lg', 'xl']) {        
        const selector = `.modal-fullscreen-${key}`;
            
        Object.assign(modal, {
            // Automatically set modal's width for larger viewports
            [`@media only screen and (max-height: ${theme(`modal.${key}`)})`]: {
                [selector]: {
                    width: '100vw',
                    maxWidth: 'none',
                    height: '100%',
                    margin: 0,
                },

                [`${selector} .modal-content`]: {
                    height: '100%',
                    border: 0,
                    borderRadius: 0,
                },

                [`${selector} .modal-header`]: {
                    borderRadius: 0,
                },
    
                [`${selector} .modal-body`]: {
                    overflowY: 'auto'
                },

                '.modal-footer': {
                    borderRadius: 0
                }
            }
        });
    }
    
    addComponents(modal);
}, {
    theme: {
        modal: theme => ({
            inner: {
                padding: '1rem',
            },
                
            dialog: {
                margin: '.5rem',
                up: {
                    marginY: '1.75rem',
                },
                zIndex: 2
            },

            title: {
                fontWeight: 'normal',
                lineHeight: 1.5,
            },

            content: {
                backgroundColor: theme('colors.white', colors.white),
                borderColor: Color(theme('colors.black', colors.black)).fade(.8),
                borderWidth: '1px',
                borderRadius: '.3rem',
                xs: {
                    boxShadow: `0 .5rem 1rem ${Color(theme('colors.black', colors.black)).fade(.925)}`,
                },
                inner: {
                    borderRadius: 'calc(.3rem - 1px)'
                },
                up: {
                    boxShadow: `0 .5rem 1rem ${Color(theme('colors.black', colors.black)).fade(.85)}`
                }
            },

            backdrop: {
                backgroundColor: theme('colors.black', colors.black),
                opacity: .5,
                zIndex: 1
            },

            header: {
                borderColor: colors.gray[300],
                borderWidth: '1px',
                fontSize: '1.5rem',
                paddingY: '1rem',
                paddingX: '1rem',
                padding: '1rem 1rem'
            },

            footer: {
                borderColor: colors.gray[300],
                borderWidth: '1px',
                marginBetween: '.5rem'
            },
                
            transition: 'transform .3s ease-out, opacity .3s ease-out',

            transform: {
                fade: 'translate(0, calc(-100% - 50px))',
                scale: 'scale(1.02)',
                show: 'none',
            },

            sm: '300px',
            md: '500px',
            lg: '800px',
            xl: '1140px',
                
            zIndex: 100
        })
    }
});