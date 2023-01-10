class UserInfo {
  /**
   * @param {object} userInfo
   * @param {string} userInfo.nameSelector
   * @param {string} userInfo.jobSelector
   */
  constructor({nameSelector, jobSelector}) {
    this._nameElem = document.querySelector(nameSelector);
    this._jobElem = document.querySelector(jobSelector)
  }

  /**
   * @typedef {object} userInfo
   * @property {string} name - user name
   * @property {string} job - user job
   * @returns {userInfo} return object with 2 properties: name and job
   */
  getUserInfo() {
    return {
      name: this._nameElem.textContent,
      job: this._jobElem.textContent
    }
  }

  /**
   * @param {string} name - user name
   * @param {string} job - user job/occupation
   */
  setUserInfo(name, job) {
    this._nameElem.textContent = name;
    this._jobElem.textContent = job;
  }
}

export default UserInfo;