import cookie from "react-cookies";
import { UserModel } from "./Models";
import Swal from 'sweetalert2'

export const BaseAPIUrl = 'http://notice.me';
export const API_END_POINTS = {
    Login: BaseAPIUrl + '/Account/Login',
    CreateNotice: BaseAPIUrl + '/Notice/AddOrUpdateNotice',
    GetNotices: BaseAPIUrl + '/Notice/GetNotices',
    GetNoticeDetails: BaseAPIUrl + '/Notice/GetNoticeDetails',
    DeleteNotice: BaseAPIUrl + '/Notice/DeleteNotice',
}

export class Utils {
    saveLoginDataInCookies = (data) =>{
        var dataToSave = data.userId + '||' + data.userName + '||' + data.email + '||';
        cookie.save(
            'loggedUser',
            dataToSave,
            {
                path: '/',
                maxAge: 60 * 60 * 24 * 14
            }
        )
    }
    getUserDataFromCookies = () => {
        var userData = cookie.load('loggedUser');
        if (userData == null || userData === undefined) {
            return new UserModel();
        }
        else{
            var user = new UserModel();
            user.userId = userData.split('||')[0];
            user.userName = userData.split('||')[1];
            user.email = userData.split('||')[2];
            return user;
        }
    }
    clearLoginDataFromCookies = () => {
        cookie.remove('loggedUser');
    }
    isLoggedIn = () => {
        var userData = cookie.load('loggedUser');
        if (userData == null || userData === undefined) {
            return false;
        }
        return true;
    }
    GetDateFromServer = (dateString) => {
        var extractedDate = dateString.substring(6, dateString.length - 2);
        return new Date(parseInt(extractedDate)).toLocaleDateString();
    }
    showDefaultMessage = (message) => {
        Swal.fire({
            title: message,
            showClass: {
                popup: 'animated fadeInDown faster'
            },
            hideClass: {
                popup: 'animated fadeOutUp faster'
            }
        })
    }

    showErrorMessage = (message) => {
        Swal.fire({
            icon: 'error',
            title: message,
            showClass: {
                popup: 'animated fadeInDown faster'
            },
            hideClass: {
                popup: 'animated fadeOutUp faster'
            }
        })
    }
}