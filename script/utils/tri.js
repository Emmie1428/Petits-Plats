
export default function initTri() {
    document.addEventListener("DOMContentLoaded", () => {
        const tagLists = document.querySelector(".tagLists");
        const currentOption = tagLists.querySelector("li");
        const otherOptions = tagLists.querySelectorAll("li:not(:first-child)");
        const menuDown = document.getElementById("menu-down");
        const menuUp = document.getElementById("menu-up");

        //Cache les autres options et affiche le menuDown
        menuDown.classList.remove("hidden");
        menuUp.classList.add("hidden");
        otherOptions.forEach(option => option.classList.add("hidden"));

        //Gère l'ouverture et la fermeture du menu déroulant
        function toggleMenu() {
            if (!otherOptions.length) return;
            const isOpen = !otherOptions[0].classList.contains("hidden");
            
            otherOptions.forEach(option => {
                option.classList.toggle("hidden", isOpen);
            });

            menuDown.classList.toggle("hidden", !isOpen);
            menuUp.classList.toggle("hidden", isOpen);

            currentOption.setAttribute("aria-expanded", String(!isOpen));
        }  

        //Ouverture et fermeture du menu déroulant au click
        currentOption.addEventListener("click", toggleMenu);

        //Ouverture et fermeture du menu déroulant avec enter
        currentOption.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault(); 
                toggleMenu();
            }
        });

        tagLists.addEventListener("focusout", () => {
            setTimeout(() => {
                if (!tagLists.contains(document.activeElement)) {
                    otherOptions.forEach(option => option.classList.add("hidden"));
                    menuDown.classList.remove("hidden");
                    menuUp.classList.add("hidden");
                    currentOption.setAttribute("aria-expanded", "false");
                }
            }, 0);
        });
    });
}