import { GestureRecognizerBase } from "./GestureRecognizerBase";
/**
 * Class decorator factory that defines the decorated class as a gesture recognizer.
 * @param {string} gestureType The type of recognized gesture.
 */
export declare function gestureRecognizer(gestureType: string): (ctor: Omit<typeof GestureRecognizerBase, "new"> | (new (...args: any[]) => GestureRecognizerBase<any, any>), context?: ClassDecoratorContext<typeof GestureRecognizerBase>) => void;
//# sourceMappingURL=gestureRecognizerDecorator.d.ts.map