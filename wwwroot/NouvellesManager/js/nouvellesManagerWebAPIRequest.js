/*
    Méthodes d'accès aux services Web API NouvellesManager
 */

const apiBaseURL= "http://localhost:5000/api/Nouvelles";
const baseQuery = '?sort=Date'


function webAPI_HEAD(successCallBack) {
    $.ajax({
        url: apiBaseURL,
        type: 'HEAD',
        contentType: 'text/plain',
        complete: function (request) {
            console.log(request.getResponseHeader('ETag'));
            successCallBack(request.getResponseHeader('ETag'));
        },
        error: function (jqXHR) {
            console.log("webAPI_HEAD - error", jqXHR.status);
        }
    });
}
function webAPI_GET_ALL(successCallBack) {
    $.ajax({
        url: apiBaseURL + baseQuery,
        type: 'GET',
        contentType: 'text/plain',
        data: {},
        success: (data, status, xhr) => {
            let ETag = xhr.getResponseHeader("ETag");
            successCallBack(data, ETag);
            console.log("webAPI_GET_ALL - success", data);
            console.log(`ETag: ${ETag}`);
        },
        error: function (jqXHR) {
            errorCallBack(jqXHR.status);
            console.log("webAPI_HEAD - error", jqXHR.status);
        }
    });
}

function webAPI_GET_RANGE(offset,limit,successCallBack) {
    $.ajax({
        url: apiBaseURL + baseQuery + `&offset=${offset}&limit=${limit}`,
        type: 'GET',
        contentType: 'text/plain',
        data: {},
        success: (data, status, xhr) => {
            let ETag = xhr.getResponseHeader("ETag");
            successCallBack(data, ETag);
            console.log("webAPI_GET_RANGE - success", data);
            console.log(`ETag: ${ETag}`);
        },
        error: function (jqXHR) {
            errorCallBack(jqXHR.status);
            console.log("webAPI_HEAD - error", jqXHR.status);
        }
    });
}


function webAPI_getNouvelles(successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL,
        type: 'GET',
        success: nouvelles => {
            successCallBack(nouvelles);
            console.log("webAPI_getNouvelles - success");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            errorCallBack("Erreur " + jqXHR.status);
            console.log("webAPI_getNouvelle - error");
        }
    });
}

function webAPI_getNouvelle(id, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/" + id,
        type: 'GET',
        success: nouvelle => { successCallBack(nouvelle); console.log("webAPI_getNouvelle - success"); },
        error: function (jqXHR, textStatus, errorThrown) {
            errorCallBack("Erreur " + jqXHR.status);
            console.log("webAPI_getNouvelle - error");
        }
    });
}

function webAPI_getNouvellesRange(offset, limit, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + baseQuery + `&offset=${offset}&limit=${limit}`,
        type: 'GET',
        success: nouvelles => {
            successCallBack(nouvelles);
            console.log("webAPI_getNouvelles - success");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            errorCallBack("Erreur " + jqXHR.status);
            console.log("webAPI_getNouvelle - error");
        }
    });
}

function webAPI_addNouvelle(nouvelle, successCallBack, errorCallBack) {
    console.log('add', nouvelle)
    $.ajax({
        url: apiBaseURL,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(nouvelle),
        success: () => { successCallBack(); console.log("webAPI_addNouvelle - success"); },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            errorCallBack("Erreur " + jqXHR.status);
            console.log("webAPI_addNouvelle - error");
        }
    });
}

function webAPI_modifyNouvelle(nouvelle, successCallBack, errorCallBack) {
    console.log('modify', nouvelle)
    $.ajax({
        url: apiBaseURL + "/" + nouvelle.Id,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(nouvelle),
        success: () => { successCallBack(); console.log("webAPI_modifyNouvelle - success"); },
        error: function (jqXHR, textStatus, errorThrown) {
            errorCallBack("Erreur " + jqXHR.status);
            console.log("webAPI_modifyNouvelle - error");
        }
    });
}

function webAPI_deleteNouvelle(id, successCallBack, errorCallBack) {
    $.ajax({
        url: apiBaseURL + "/" + id,
        contentType: 'text/plain',
        type: 'DELETE',
        success: () => { successCallBack(); console.log("webAPI_deleteNouvelle - success"); },
        error: function (jqXHR, textStatus, errorThrown) {
            errorCallBack("Erreur " + jqXHR.status);
            console.log("webAPI_deleteNouvelle - error");
        }
    });
}
