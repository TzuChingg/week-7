// API獲取資料
axios
  .get(
    "https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json"
  )
  .then((res) => {
    const data = res.data.data;
    data.forEach((el) => {
      let example = `
        <div class="ticketCard-img">
          <a href="#">
            <img
              src=${el.imgUrl}
              alt=""
            />
          </a>
          <div class="ticketCard-region">${el.area}</div>
          <div class="ticketCard-rank">${el.rate}</div>
        </div>
        <div class="ticketCard-content">
          <div>
            <h3>
              <a href="#" class="ticketCard-name">${el.name}</a>
            </h3>
            <p class="ticketCard-description">
              ${el.description}
            </p>
          </div>
          <div class="ticketCard-info">
            <p class="ticketCard-num">
              <span><i class="fas fa-exclamation-circle"></i></span>
              剩下最後 <span id="ticketCard-num"> ${el.group} </span> 組
            </p>
            <p class="ticketCard-price">
              TWD <span id="ticketCard-price">$${el.price}</span>
            </p>
          </div>
        </div>`;
      let addHTML = document.createElement("li");
      addHTML.className = "ticketCard";
      addHTML.innerHTML = example;
      document.querySelector(".ticketCard-area").appendChild(addHTML);
    });

    const ticketCardRegion = document.querySelectorAll(".ticketCard-region");
    updateRegion();
    // 更新搜尋提示字
    const searchResult = document.querySelector("#searchResult-text");
    searchResult.innerHTML = `全部共 ${ticketCardRegion.length} 筆資料`;
  })
  .catch((er) => {
    console.log(er);
  });

//  重新篩選區域
const ticketCardRegion = document.querySelectorAll(".ticketCard-region");
let RegionList = [""];
function updateRegion() {
  ticketCardRegion.forEach((el) => {
    if (!RegionList.includes(el.innerHTML)) {
      RegionList.push(el.innerHTML);
    }
  });
}

// 篩選結果
const selector = document.querySelector(".regionSearch");
selector.addEventListener("click", () => {
  // 重新抓取位置
  const ticketCard = document.querySelectorAll(".ticketCard");
  const ticketCardRegion = document.querySelectorAll(".ticketCard-region");
  const regionSearch = document.querySelector(".regionSearch");
  const ticketCardArea = document.querySelector(".ticketCard-area");
  const cantFindArea = document.querySelector(".cantFind-area");

  updateRegion();
  // 搜尋結果
  const searchResult = document.querySelector("#searchResult-text");
//   searchResult.innerHTML = `全部共 ${ticketCardRegion.length} 筆資料`;

  regionSearch.addEventListener("change", (element) => {
    if (!RegionList.includes(element.target.value)) {
      ticketCardArea.setAttribute("style", "display: none;");
      cantFindArea.setAttribute("style", "display: inline;");
      searchResult.innerHTML = `本次搜尋共 0 筆資料`;
    } else {
      ticketCardArea.removeAttribute("style");
      cantFindArea.removeAttribute("style");
      let len = 0;
      ticketCardRegion.forEach((el, index) => {
        if (element.target.value == "") {
          ticketCard[index].removeAttribute("style");
          // 搜尋結果隱藏
          searchResult.innerHTML = `全部共 ${ticketCardRegion.length} 筆資料`;
        } else if (el.innerHTML !== element.target.value) {
          ticketCard[index].setAttribute("style", "display: none;");
        } else {
          ticketCard[index].removeAttribute("style");
          len++;
          // 搜尋結果顯示
          searchResult.removeAttribute("style");
          searchResult.innerHTML = `本次搜尋共 ${len} 筆資料`;
        }
      });
    }
  });
});

// 新增套票
let ticketToTicketCard = {
  ticketName: "name",
  ticketImgUrl: "imgUrl",
  ticketRegion: "area",
  ticketPrice: "price",
  ticketNum: "group",
  ticketRate: "rate",
  ticketDescription: "description",
};
let addTicketInfo = {};
const addTicketForm = document.querySelector(".addTicket-form");
addTicketForm.addEventListener("change", (el) => {
  let key = el.target.id;
  addTicketInfo[ticketToTicketCard[key]] = el.target.value;
  console.log(addTicketInfo);
});

// 提交表單
const submit = document.querySelector(".addTicket-btn");
submit.addEventListener("click", () => {
  let valueList = [];
  for (const key in addTicketInfo) {
    valueList.push(addTicketInfo[key]);
  }
  if (valueList.filter((el) => el !== "").length !== 7) {
    document.querySelector(".modal-body").innerHTML =
      "新增失敗，請確認格子內是否全部填寫";
  } else {
    document.querySelector(".modal-body").innerHTML = "新增成功";
    let example = `
    <div class="ticketCard-img">
      <a href="#">
        <img
          src=${addTicketInfo.imgUrl}
          alt=""
        />
      </a>
      <div class="ticketCard-region">${addTicketInfo.area}</div>
      <div class="ticketCard-rank">${addTicketInfo.rate}</div>
    </div>
    <div class="ticketCard-content">
      <div>
        <h3>
          <a href="#" class="ticketCard-name">${addTicketInfo.name}</a>
        </h3>
        <p class="ticketCard-description">
          ${addTicketInfo.description}
        </p>
      </div>
      <div class="ticketCard-info">
        <p class="ticketCard-num">
          <span><i class="fas fa-exclamation-circle"></i></span>
          剩下最後 <span id="ticketCard-num"> ${addTicketInfo.group} </span> 組
        </p>
        <p class="ticketCard-price">
          TWD <span id="ticketCard-price">$${addTicketInfo.price}</span>
        </p>
      </div>
    </div>`;
    let addHTML = document.createElement("li");
    addHTML.className = "ticketCard";
    addHTML.innerHTML = example;
    document.querySelector(".ticketCard-area").appendChild(addHTML);
    document.getElementById("form1").reset(); //重置
  }
});

function blur(Dom) {
  Dom.addEventListener("blur", (el) => {
    const position = document.querySelector(`#${el.target.id}-message`);
    position.innerHTML = "";
    if (el.target.value === "") {
      let firstWordNode = document.createElement("i");
      firstWordNode.className = "fas fa-exclamation-circle";
      let secondWordNode = document.createElement("span");
      secondWordNode.innerHTML = "必填!";
      position.appendChild(firstWordNode);
      position.appendChild(secondWordNode);
    }
  });
}

function focus(Dom) {
  Dom.addEventListener("focus", (el) => {
    const i = document.querySelector(`#${el.target.id}-message i`);
    const span = document.querySelector(`#${el.target.id}-message span`);
    if (i !== null) {
      i.remove();
      span.remove();
    }
  });
}

// 表格監聽
const form = document.querySelector(".addTicket-form");
form.addEventListener(
  "focus",
  (e) => {
    if (e.target.id == "") {
      return;
    } else {
      const trackElement = document.querySelector(`#${e.target.id}`);
      console.log(e.target.id);
      blur(trackElement);
      focus(trackElement);
    }
  },
  true
);
