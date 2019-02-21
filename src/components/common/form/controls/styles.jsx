export const styles = {
    root: {
        border: '1px solid #C1CFE0',
    },
    focused: {
        border: '1px solid #A1C4FF',
    },
    error: {
        border: '1px solid red',
    },
    label: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        lineHeight: 'normal',
        fontSize: 17,
        color: '#657C9A!important',
        marginTop: 5,
    },
    selectLabel: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        lineHeight: 'normal',
        fontSize: 17,
        color: '#657C9A!important',
        margin: '6px 0',
    },
    input: {
        color: '#000',
        backgroundColor: '#FFF',
        minHeight: 40,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        lineHeight: 'normal',
        fontSize: 17,
        width: '100%',
        boxSizing: 'border-box',
        borderRadius: 0,
        padding: '0 0 3px 10px',
    },
    inputControl: {
        marginTop: '5px!important',
    },
    formControl: {
        margin: '15px 0 5px 0',
        width: '100%',
    },
    endAdornment: {
        marginLeft: -48,
    },
    radio: {
        '&$checked': {
            color: '#4B8DF8'
        },
        color: '#657C9A',
    },
    checked: {},
    radioLabelRoot: {
        color: '#657C9A',
    },
    avatar: {
        width: 170,
        height: 170,
        border: '3px solid #5E97F3',
    },
    avatarErrorMessage: {
        color: 'red',
        fontSize: '0.85rem',
    },
    picture: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    uploadBtnWrapper: {
        position: 'relative',
        overflow: 'hidden',
        display: 'inline-block',
        cursor: 'pointer',
        marginTop: 7,
        '& input[type=file]': {
            cursor: 'pointer',
            fontSize: 100,
            position: 'absolute',
            left: 0,
            top: 0,
            opacity: 0,
        }
    },
    uploadBtn: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: 'normal',
        fontSize: 17,
        color: '#9BB0CB',
        backgroundColor: 'transparent',
        padding: '8px 20px',
        borderRadius: 8,
        border: 'none',
    },
    checkbox: {
        padding: '5px 0',
        color: '#9BB0CB',
    },
    checkboxChecked: {
        color: '#4E86E4',
    },
};
