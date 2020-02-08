import {
  GET_NOTICES,
  HANDLE_NOTICE_MODAL,
  HANDLE_NOTICE_FORM_CHANGE,
  DELETE_NOTICE
} from "./ActionTypes";
import HttpService from "../Utils/HttpService";
import { API_END_POINTS, Utils } from "../Utils/Utils";
import { NoticeFilterModel, NoticeModel } from "../Utils/Models";

const http = new HttpService();


export const handleNoticeModal = (status, noticeFromAPI = new NoticeModel(), editMode) => {
  return {
    type: HANDLE_NOTICE_MODAL,
    openStatus: status,
    notice: noticeFromAPI,
    editModeInfo: editMode
  };
};

export const noticeModalFromAPI = (status, noticeId = 0, editMode) => {
  return dispatch => {
    if (noticeId === 0) {
      dispatch(handleNoticeModal(status));
    } else {
      http.getData(API_END_POINTS.GetNoticeDetails + '?id=' + noticeId).then(response => {
        dispatch(handleNoticeModal(status, response.data.results[0], editMode))
      }).catch(error => {
        console.log(error)
        dispatch(handleNoticeModal(false))
      })
    }
  };
};




export const handleNoticeModalChange = updatedNotice => {
  return {
    type: HANDLE_NOTICE_FORM_CHANGE,
    notice: updatedNotice
  };
};

export const handleNoticeModalFormChange = (e, notice) => {
  let inputName = e.target.name;
  let inputValue = e.target.value;
  let noticeCopy = Object.assign({}, notice);
  noticeCopy[inputName] = inputValue;
  return dispatch => {
    dispatch(handleNoticeModalChange(noticeCopy));
  };
};



export const getNotices = (noticeData, count) => {
  return {
    type: GET_NOTICES,
    payload: noticeData,
    recordsCount: count
  };
};

export const getNoticesFromAPI = noticeFilter => {
  return dispatch => {
    loadNotices(dispatch, noticeFilter);
  };
};

export const loadNotices = (dispatch, noticeFilter) => {
  http.postData(API_END_POINTS.GetNotices, noticeFilter).then(response => {
    dispatch(getNotices(response.data.results[0], response.data.results[1]));
  }).catch(error => {
    console.log(error);
    dispatch(getNotices([]));
  });
};



export const addNoticeToAPI = notice => {
  return dispatch => {
    http.postData(API_END_POINTS.CreateNotice, notice).then(response => {
      var added = response.data.results[0];
      if (added) {
        var noticeFilter = new NoticeFilterModel();
        loadNotices(dispatch, noticeFilter);
      } else {
        dispatch(getNotices([]));
      }
    }).catch(error => {
      console.log(error);
      dispatch(getNotices([]));
    });
  };
};


export const deleteNotice = () => {
  return {
    type: DELETE_NOTICE
  }
}

export const deleteNoticeFromAPI = (noticeId) => {
  return (dispatch) => {
    http.getData(API_END_POINTS.DeleteNotice + '?id=' + noticeId).then(response => {
      if (response.data.results[0]) {
        new Utils().showDefaultMessage('Notice deleted.');
        var noticeFilter = new NoticeFilterModel();
        loadNotices(dispatch, noticeFilter);
      }
      else {
        new Utils().showErrorMessage('Some error occured. Please try again.');
      }
    }).catch(error => {
      new Utils().showErrorMessage(error);
    })
  }
}