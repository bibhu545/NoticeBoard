import { GET_NOTICES, HANDLE_NOTICE_MODAL, HANDLE_NOTICE_FORM_CHANGE } from "./ActionTypes"
import { NoticeModel } from "../Utils/Models"

const commonInitialState = {
    editMode: false,
    showNoticeModal: false,
    notice: new NoticeModel(),
    notices: [],
    recordsCount: 0
}

export const commonReducer = (state = commonInitialState, action) => {
    switch (action.type) {
        case GET_NOTICES:
            return {
                ...state,
                notices: action.payload,
                recordsCount: action.recordsCount
            }
        case HANDLE_NOTICE_MODAL: {
            return {
                ...state,
                showNoticeModal: action.openStatus,
                notice: action.notice,
                editMode: action.editModeInfo
            }
        }
        case HANDLE_NOTICE_FORM_CHANGE: {
            return {
                ...state, 
                notice: action.notice
            }
        }
        default: {
            return state
        }
    }
}