//可变数据如何“偷袭”我们的程序
//猎头公司
const headhuntingCompany = [];
//本公司
const selfCompany = [];
//修改招聘需求中的"Level"
function changeJobLevel(jobInfo, level) {
  const newLevelJob = jobInfo;
  newLevelJob.level = level;
  return newLevelJob;
}
//检验是否面向高管群体
function isHighLevelJob(jobInfo) {
  return jobInfo.level >= 9;
}

function releaseJobs(jobList) {
  jobList.forEach((job) => {
    if (isHighLevelJob(job)) {
      // 转发给猎头公司
      headhuntingCompany.push(job);
    } else {
      // 转发到公司内部的池子里去
      selfCompany.push(job);
    }
  });
}

//mock数据
const JOB_INFO_001 = {
  level: 7,
  workTime: 2,
  type: "engineer",
  city: "New York",
};
/*
 需求:
 创建一条各方面条件都和 JOB_INFO_001 一致，
 但是 level 为 10 的招聘需求 JOB_INFO_002。
 随后，将 JOB_INFO_001 和 JOB_INFO_002 一起发布。
*/
const JOB_INFO_002 = changeJobLevel(JOB_INFO_001, 10);
// 组装两条数据为一个发布数组
const releaseList = [JOB_INFO_001, JOB_INFO_002];
// 发布两条数据
releaseJobs(releaseList, isHighLevelJob);
console.log(headhuntingCompany, selfCompany);
