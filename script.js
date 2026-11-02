async function copyText() {
  const p = document.getElementById("copy-ip"); 
  try { 
    await navigator.clipboard.writeText(p.textContent);
    const confirm = document.getElementById("copied-confirm");
    confirm.style.display = "block";  
    setTimeout(() => {confirm.style.display = "none";}, 1500);
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
}