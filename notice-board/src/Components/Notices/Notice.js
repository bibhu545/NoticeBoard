import React from 'react'
import { ButtonGroup, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import { Utils } from '../../Utils/Utils';
import { noticeModalFromAPI, deleteNoticeFromAPI } from '../../Redux/Actions';
import { connect } from 'react-redux';

function Notice(props) {
    const utils = new Utils()
    return (
        <tr>
            <td>{utils.GetDateFromServer(props.data.postedOn)}</td>
            <td>{props.data.title}</td>
            <td>{props.data.userData.email}</td>
            <td>
                <ButtonGroup size="small" aria-label="small outlined button group">
                    <Button onClick={() => props.handleNoticeModal(true, props.data.noticeId)}><CreateIcon /></Button>
                    <Button onClick={() => props.deleteNotice(props.data.noticeId)}><DeleteIcon className='red-button' /></Button>
                </ButtonGroup>
            </td>
        </tr>
    )
}

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

const mapActionToProps = (dispatch) => {
    return {
        handleNoticeModal: (status, id) => {
            dispatch(noticeModalFromAPI(status, id, true))
        },
        deleteNotice: (noticeId) => {
            dispatch(deleteNoticeFromAPI(noticeId))
        }
    }
} 

export default connect(mapStateToProps, mapActionToProps)(Notice)
