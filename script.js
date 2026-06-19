const searchInput = document.querySelector("#guide-search");
const cards = [...document.querySelectorAll(".guide-card")];
const emptyState = document.querySelector("#empty-state");
const expandButton = document.querySelector("#expand-all");
const toast = document.querySelector("#toast");

let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 1800);
}

function normalise(text) {
  return text.toLowerCase().replace(/\s+/g, "");
}

function filterCards() {
  const query = normalise(searchInput.value);
  let visibleCount = 0;

  cards.forEach((card) => {
    const haystack = normalise(`${card.textContent} ${card.dataset.tags || ""}`);
    const isMatch = !query || haystack.includes(query);
    card.hidden = !isMatch;
    if (isMatch) {
      visibleCount += 1;
      if (query) card.open = true;
    }
  });

  emptyState.hidden = visibleCount > 0;
}

searchInput.addEventListener("input", filterCards);

expandButton.addEventListener("click", () => {
  const hasClosed = cards.some((card) => !card.hidden && !card.open);
  cards.forEach((card) => {
    if (!card.hidden) card.open = hasClosed;
  });
  expandButton.textContent = hasClosed ? "전체 접기" : "전체 펼치기";
});

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(value);
      showToast("비밀번호를 복사했습니다.");
    } catch {
      showToast(value);
    }
  });
});

document.querySelectorAll(".guide-card").forEach((card) => {
  card.addEventListener("toggle", () => {
    const hasClosed = cards.some((item) => !item.hidden && !item.open);
    expandButton.textContent = hasClosed ? "전체 펼치기" : "전체 접기";
  });
});
