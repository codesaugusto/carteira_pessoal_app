/**
 * Anima a transição de cor entre os ícones da navegação
 * Remove a cor verde do ícone anterior e aplica ao novo
 * @param buttonIndex - Índice do botão clicado (0-3)
 */
export const animateNavIcon = (buttonIndex: number): void => {
  const buttons = document.querySelectorAll<HTMLButtonElement>(".nav-button");

  buttons.forEach((button, index) => {
    button.classList.remove("text-green-500");
    button.classList.add("text-gray-500", "transition-colors", "duration-300");

    if (index === buttonIndex) {
      button.classList.remove("text-gray-500");
      button.classList.add("text-green-500");
    }
  });
};

/**
 * Inicializa o estado ativo do primeiro botão (HOME)
 */
export const initializeNavAnimation = (): void => {
  const buttons = document.querySelectorAll<HTMLButtonElement>(".nav-button");

  buttons.forEach((button, index) => {
    button.classList.add("transition-colors", "duration-300");

    if (index === 0) {
      button.classList.add("text-green-500");
    } else {
      button.classList.add("text-gray-500");
    }
  });
};

/**
 * Obtém o índice do botão ativo
 * @returns Índice do botão com cor verde
 */
export const getActiveNavIndex = (): number => {
  const buttons = document.querySelectorAll<HTMLButtonElement>(".nav-button");
  const activeButton = Array.from(buttons).findIndex((button) =>
    button.classList.contains("text-green-500"),
  );
  return activeButton !== -1 ? activeButton : 0;
};
