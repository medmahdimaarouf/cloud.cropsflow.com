import { onBeforeUnmount, onMounted, ref, Ref } from 'vue';

type ResizerType = 'left' | 'top' | 'right' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface ResizableOptions {
    left?: boolean;
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
    minWidth?: number;
    minHeight?: number;
    onResizeStart?: (data: { resizerType: ResizerType; element: HTMLElement }) => void;
    onResize?: (data: { width: number; height: number; left: number; top: number; element: HTMLElement }) => void;
    onResizeEnd?: (data: { element: HTMLElement }) => void;
}

interface ResizableReturn {
    isResizing: Ref<boolean>;
    setupResizers: () => void;
}

export function useResizable(el: Ref<HTMLElement | null>, options: ResizableOptions = {}): ResizableReturn {
    const { left = true, top = true, right = true, bottom = true, minWidth = 50, minHeight = 50, onResizeStart = () => {}, onResize = () => {}, onResizeEnd = () => {} } = options;

    const isResizing = ref(false);
    const activeResizer = ref<ResizerType | null>(null);
    const startX = ref(0);
    const startY = ref(0);
    const startWidth = ref(0);
    const startHeight = ref(0);
    const startLeft = ref(0);
    const startTop = ref(0);

    const startResize = (resizerType: ResizerType, e: MouseEvent) => {
        if (!el.value) return;

        e.preventDefault();
        e.stopPropagation();

        isResizing.value = true;
        activeResizer.value = resizerType;

        const rect = el.value.getBoundingClientRect();
        startX.value = e.clientX;
        startY.value = e.clientY;
        startWidth.value = rect.width;
        startHeight.value = rect.height;
        startLeft.value = rect.left;
        startTop.value = rect.top;

        onResizeStart({ resizerType, element: el.value });

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', stopResize);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isResizing.value || !activeResizer.value || !el.value) return;

        const dx = e.clientX - startX.value;
        const dy = e.clientY - startY.value;

        let newWidth = startWidth.value;
        let newHeight = startHeight.value;
        let newLeft = startLeft.value;
        let newTop = startTop.value;

        switch (activeResizer.value) {
            case 'left':
                newWidth = Math.max(minWidth, startWidth.value - dx);
                newLeft = startLeft.value + dx;
                break;
            case 'right':
                newWidth = Math.max(minWidth, startWidth.value + dx);
                break;
            case 'top':
                newHeight = Math.max(minHeight, startHeight.value - dy);
                newTop = startTop.value + dy;
                break;
            case 'bottom':
                newHeight = Math.max(minHeight, startHeight.value + dy);
                break;
            case 'top-left':
                newWidth = Math.max(minWidth, startWidth.value - dx);
                newHeight = Math.max(minHeight, startHeight.value - dy);
                newLeft = startLeft.value + dx;
                newTop = startTop.value + dy;
                break;
            case 'top-right':
                newWidth = Math.max(minWidth, startWidth.value + dx);
                newHeight = Math.max(minHeight, startHeight.value - dy);
                newTop = startTop.value + dy;
                break;
            case 'bottom-left':
                newWidth = Math.max(minWidth, startWidth.value - dx);
                newHeight = Math.max(minHeight, startHeight.value + dy);
                newLeft = startLeft.value + dx;
                break;
            case 'bottom-right':
                newWidth = Math.max(minWidth, startWidth.value + dx);
                newHeight = Math.max(minHeight, startHeight.value + dy);
                break;
        }

        // Apply new dimensions
        el.value.style.width = `${newWidth}px`;
        el.value.style.height = `${newHeight}px`;
        el.value.style.left = `${newLeft}px`;
        el.value.style.top = `${newTop}px`;

        onResize({
            width: newWidth,
            height: newHeight,
            left: newLeft,
            top: newTop,
            element: el.value
        });
    };

    const stopResize = () => {
        if (!isResizing.value || !el.value) return;

        isResizing.value = false;
        activeResizer.value = null;

        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', stopResize);

        onResizeEnd({ element: el.value });
    };

    const createResizer = (type: ResizerType): HTMLElement => {
        const resizer = document.createElement('div');
        resizer.className = `resizer resizer-${type}`;
        resizer.addEventListener('mousedown', (e) => startResize(type, e as MouseEvent));
        return resizer;
    };

    const setupResizers = () => {
        if (!el.value) return;

        // Clear existing resizers
        const existingResizers = el.value.querySelectorAll('.resizer');
        existingResizers.forEach((resizer) => resizer.remove());

        // Make sure the element is positioned
        if (getComputedStyle(el.value).position === 'static') {
            el.value.style.position = 'absolute';
        }

        // Add resizers based on options
        if (left) el.value.appendChild(createResizer('left'));
        if (top) el.value.appendChild(createResizer('top'));
        if (right) el.value.appendChild(createResizer('right'));
        if (bottom) el.value.appendChild(createResizer('bottom'));

        // Add corner resizers if needed
        if (left && top) el.value.appendChild(createResizer('top-left'));
        if (right && top) el.value.appendChild(createResizer('top-right'));
        if (left && bottom) el.value.appendChild(createResizer('bottom-left'));
        if (right && bottom) el.value.appendChild(createResizer('bottom-right'));
    };

    onMounted(() => {
        setupResizers();
    });

    onBeforeUnmount(() => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', stopResize);
    });

    return {
        isResizing,
        setupResizers
    };
}
