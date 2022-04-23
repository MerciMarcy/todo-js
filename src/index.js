import "./styles.css";

const onClickAdd = () => {
  // テキストボックの値を取得し、初期化する
  const inputText = document.getElementById("add-text").value;
  document.getElementById("add-text").value = "";

  addToIncompleteList(inputText);
};

// 未完了リストから指定の要素を削除(関数)
const deleteFromIncompleteList = (target) => {
  document.getElementById("incomplete-list").removeChild(target);
};

// 未完了リストに追加（関数）
const addToIncompleteList = (text) => {
  // li生成
  const li = document.createElement("li");
  // div生成
  const div = document.createElement("div");
  div.className = "list-row";
  // liタグの子要素にdivタグを設定
  li.appendChild(div);
  // pタグ生成
  const p = document.createElement("p");
  p.innerText = text;
  // button(完了)タグ作成
  const completeButton = document.createElement("button");
  completeButton.innerText = "完了";
  completeButton.addEventListener("click", () => {
    // 押された完了ボタンの先祖タグ（li）を未完了リストから削除
    deleteFromIncompleteList(completeButton.closest("li"));
    // 完了リストへ追加する要素
    const addTarget = completeButton.closest("li");
    // ToDo内容テキストを取得
    const listContents = addTarget.firstElementChild;
    const text = listContents.firstElementChild.innerText;
    // li以下を初期化
    addTarget.textContent = null;
    // pタグ生成
    const p = document.createElement("p");
    p.innerText = text;
    //button(戻す)タグ生成
    const backButton = document.createElement("button");
    backButton.innerText = "戻す";
    // backButtonの処理
    backButton.addEventListener("click", () => {
      // 押された戻すボタンの先祖タグ（li）を完了リストから削除
      const deleteTarget = backButton.closest("li");
      document.getElementById("complete-list").removeChild(deleteTarget);
      // ToDo内容テキストを取得
      const listContents = deleteTarget.firstElementChild;
      const text = listContents.firstElementChild.innerText;
      addToIncompleteList(text);
    });
    // divタグ生成
    const div = document.createElement("div");
    div.className = "list-row";
    div.appendChild(p);
    div.appendChild(backButton);
    // liタグの子要素にdivタグを設定
    addTarget.appendChild(div);
    //　 完了リストに追加
    document.getElementById("complete-list").appendChild(addTarget);
  });
  // button(削除)タグ作成
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "削除";
  deleteButton.addEventListener("click", () => {
    // 押された削除ボタンの親タグ（li）を未完了リストから削除
    deleteFromIncompleteList(deleteButton.closest("li"));
  });
  // divタグの子要素に各要素を設定
  div.appendChild(p);
  div.appendChild(completeButton);
  div.appendChild(deleteButton);

  // 未完了リストに追加
  document.getElementById("incomplete-list").appendChild(li);
};

document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());
