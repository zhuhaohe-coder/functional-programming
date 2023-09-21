/*
用于计算一个学生的期末成绩，接收两个入参：
学生的文化课分数（generalScore)，
学生的体育课分数（healthScore）。
将这两个分数分别乘以各自的权重
文化课对应权重High，体育课对应权重Low），
最后得到一个总分。
*/
// 该函数将对给定 score 作权重为 high 的计算处理
const highWeights = (score) => score * 0.8;
// 该函数将对给定 score 作权重为 low 的计算处理
const lowWeights = (score) => score * 0.5;

const computedFinalScore1 = (generalScore, healthScore) => {
  const finalGeneralScore = highWeights(generalScore);
  const finalHealthScore = lowWeights(healthScore);
  return finalGeneralScore + finalHealthScore;
};

const Identity = (x) => ({
  map: (f) => Identity(f(x)),
  valueOf: () => x,
});

const computeFinalScore = (generalScore, healthScore) =>
  Identity(highWeights(generalScore)).map((finalGeneralScore) =>
    Identity(lowWeights(healthScore)).map(
      (finalhealthScore) => finalGeneralScore + finalhealthScore
    )
  );
