// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  parts.log.textContent = "数值 " + (spec.values || []).length + " 个，点清零看结果。";

  function draw() {
    let view = null;
    try {
      view = render(spec);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    (spec.values || []).forEach(function (value, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = "第 " + (spot + 1) + " 个 " + value;
      row.appendChild(head);
      const mark = document.createElement("span");
      mark.className = "chip" + (value < 0 ? " bad" : " ok");
      mark.textContent = value < 0 ? "清零前为负" : "原样保留";
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "清零 " + view.clamped_count + " 个，合计 " + view.total;
    parts.log.textContent = "原始合计 " + view.raw_total;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "清零并合计";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "追加一个负值";
  addButton.addEventListener("click", function () {
    spec.values = (spec.values || []).concat([-5]);
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "去掉最后一个";
  dropButton.addEventListener("click", function () {
    spec.values = (spec.values || []).slice(0, -1);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "试一个值";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "number";
  box.value = "-3";
  box.addEventListener("input", function () {
    const parsed = Number(box.value);
    if (!Number.isNaN(parsed)) {
      try {
        const view = render(Object.assign({}, spec, { values: (spec.values || []).concat([parsed]) }));
        parts.out.textContent = "加入 " + parsed + " 后清零 " + view.clamped_count + " 个，合计 " + view.total;
      } catch (error) {
        parts.out.textContent = String(error && error.code ? error.code : String(error));
      }
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看清零个数";
  readButton.addEventListener("click", function () {
    const view = render(spec);
    parts.out.textContent = "清零 " + view.clamped_count + " 个，合计 " + view.total;
  });
  parts.controls.appendChild(readButton);

  draw();
}
