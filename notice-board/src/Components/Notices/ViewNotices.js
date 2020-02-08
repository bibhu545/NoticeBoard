import React, { Component } from 'react'
import Notice from './Notice'
import { Button } from '@material-ui/core';
import { Utils } from '../../Utils/Utils';
import NoticeModal from './NoticeModal';
import HttpService from '../../Utils/HttpService';
import { NoticeFilterModel, NoticeModel } from '../../Utils/Models';
import { connect } from 'react-redux';
import { getNoticesFromAPI, handleNoticeModal } from '../../Redux/Actions';


export class ViewNotices extends Component {
  constructor(props) {
    super(props)
    this.utils = new Utils()
    this.http = new HttpService()
    this.noticeFilterModel = new NoticeFilterModel()
    this.notice = new NoticeModel()
  }

  componentDidMount() {
    this.props.getNotices(this.noticeFilterModel);
    this.recordsCount = this.props.recordsCount
  }

  handleSortBy = (e) => {
    this.noticeFilterModel.sortBy = e.target.value;
    this.props.getNotices(this.noticeFilterModel);
  }

  handlePager = (action) => {
    this.noticeFilterModel.pageNo += action;
    console.log(this.noticeFilterModel)
    this.props.getNotices(this.noticeFilterModel);
  }

  showNoticeModal = (status) => {
    this.setState({
      showNoticeModal: true
    })
  }

  handlelogOut = () => {
    this.utils.clearLoginDataFromCookies();
    window.location = '/';
  }

  closeNoticeModal = () => {
    this.setState({
      showNoticeModal: false
    })
  }

  render() {
    const { notices, showNoticeModal, handleNoticeModal, recordsCount } = this.props
    return (
      <div className='container-wrapper'>
        <div className='container'>
          <div className='row notice-header'></div>
          <div className='row notice-content'>
            <div className='col-md-12'>
              <div className='row'>
                <div className='col-md-3'>
                  <div className="form-group">
                    <select className="form-control" id="sortBy" onChange={this.handleSortBy}>
                      <option value='default'>SortBy</option>
                      <option value='date'>Date</option>
                      <option value='postedBy'>Posted By</option>
                      <option value='title'>Title</option>
                    </select>
                  </div>
                </div>
                <div className='col-md-6 center-content'>
                  <Button variant="outlined" color="primary" onClick={() => handleNoticeModal(true)}>
                    New Notice
                  </Button>
                </div>
                <div className='col-md-3 right-content'>
                  <Button variant="outlined" color="primary" onClick={this.handlelogOut}>
                    Logout
                  </Button>
                </div>
              </div>
              {
                notices.length === 0 ?
                  <p className='text-primary center-content'>No notices available.</p> :
                  <React.Fragment>
                    <div className='table-responsive'>
                      <table className='table table-striped table-bordered'>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Posted By</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {notices.map((item, index) =>
                            <Notice data={item} key={index} />
                          )}
                        </tbody>
                      </table>
                    </div>
                    <br />
                    <div className='center-content'>
                      {
                        this.noticeFilterModel.pageNo <= 0 ? null :
                          <Button className='pager float-left' variant="outlined" color="primary" onClick={() => this.handlePager(-1)}>
                            &lt; Previous
                          </Button>
                      }
                      {
                        this.noticeFilterModel.pageNo >= recordsCount ? null :
                          <Button className='pager float-right' variant="outlined" color="primary" onClick={() => this.handlePager(1)}>
                            Next &gt;
                          </Button>
                      }
                      <div className='clearfix'></div>
                      <span className='pageNo-indicator'>Page: {this.noticeFilterModel.pageNo + 1}</span>
                    </div>
                    <br />
                  </React.Fragment>
              }
              <NoticeModal show={showNoticeModal} handleClose={() => handleNoticeModal(false)}></NoticeModal>
            </div>
          </div>
        </div >
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    showNoticeModal: state.showNoticeModal,
    notices: state.notices,
    recordsCount: state.recordsCount
  }
}

const mapActionToProps = (dispatch) => {
  return {
    handleNoticeModal: (status) => {
      dispatch(handleNoticeModal(status, new NoticeModel(), false))
    },
    getNotices: (noticeFilter) => {
      dispatch(getNoticesFromAPI(noticeFilter))
    }
  }
}

export default connect(mapStateToProps, mapActionToProps)(ViewNotices)
