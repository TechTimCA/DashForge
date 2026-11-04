import "preact";

declare module "preact" {
  namespace JSX {
    interface IntrinsicElements {
      "ha-icon": {
        icon?: string;
        class?: string;
        style?: string | Record<string, string>;
      };
    }
  }
}
