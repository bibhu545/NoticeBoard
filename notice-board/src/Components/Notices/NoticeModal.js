import React from 'react'
import { Button, TextField } from '@material-ui/core'
import { Utils } from '../../Utils/Utils';
import { connect } from 'react-redux';
import { addNoticeToAPI, handleNoticeModalFormChange } from '../../Redux/Actions';

function NoticeModal(props) {
    var notice = props.notice;
    var visible = props.show
    const utils = new Utils()

    const createNotice = (e) => {
        e.preventDefault();
        var notice = props.notice;
        notice.userId = utils.getUserDataFromCookies().userId;
        notice.title = e.target.title.value;
        notice.body = e.target.body.value;
        props.addNotice(notice)
        props.handleClose();
    }

    return (
        <div className={visible ? 'modal-wrapper' : 'modal-hide'}>
            <div className='custom-modal'>
                <div className="card">
                    <div className="card-header center-content">Add/Edit Notice</div>
                    <div className="card-body">
                        <div className='row'>
                            <div className='col-md-2'></div>
                            <div className='col-md-8'>
                                <form onSubmit={createNotice}>
                                    <div className='form-group'>
                                        <TextField className='full-text-field' label="Notice Title" variant="outlined" name='title' autoComplete='off' value={notice.title} onChange={(e) => props.handleNoticeFormChange(e, notice)} />
                                    </div>
                                    <div className='form-group'>
                                        <TextField multiline rows="5" className='full-text-field' label="Notice Body" variant="outlined" name='body' autoComplete='off' value={notice.body} onChange={(e) => props.handleNoticeFormChange(e, notice)} />
                                    </div>
                                    <div className='center-content'>

                                        {
                                            props.editMode ?
                                                <Button className='button-margin' type='submit' variant="outlined" color="primary">Edit Now</Button> :
                                                <Button className='button-margin' type='submit' variant="outlined" color="primary">Add Now</Button>
                                        }

                                        <Button className='button-margin' variant="outlined" color="primary" onClick={props.handleClose}>Cancel</Button>
                                    </div>
                                </form>
                            </div>
                            <div className='col-md-2'></div>
                        </div>
                    </div>
                    <div className="card-footer right-content">
                        <Button onClick={props.handleClose} variant="outlined" color="default">Close</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        notice: state.notice,
        editMode: state.editMode
    }
}

const mapActionToProps = (dispatch) => {
    return {
        addNotice: (notice) => {
            dispatch(addNoticeToAPI(notice))
        },
        handleNoticeFormChange: (e, notice) => {
            dispatch(handleNoticeModalFormChange(e, notice))
        }
    }
}

export default connect(mapStateToProps, mapActionToProps)(NoticeModal)
