import { ObjectDirective } from 'vue';

type ResizerType = 'left' | 'top' | 'right' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface ResizableOptions {
    disabled?: boolean;
    edges?: {
        left?: boolean;
        top?: boolean;
        right?: boolean;
        bottom?: boolean;
    };
    minWidth?: number;
    minHeight?: number;
    onResizeStart?: (el: HTMLElement, resizerType: ResizerType) => void;
    onResize?: (el: HTMLElement, size: { width: number; height: number }) => void;
    onResizeEnd?: (el: HTMLElement) => void;
}

const ResizableDirective: ObjectDirective<HTMLElement, ResizableOptions | undefined> = {
    mounted(el, binding) {
        initResizable(el, binding.value);
    },
    updated(el, binding) {
        const existingResizers = el.querySelectorAll('.v-resizer');
        existingResizers.forEach((resizer) => resizer.remove());

        if (!binding.value?.disabled) {
            initResizable(el, binding.value);
        }
    }
};

function initResizable(el: HTMLElement, options?: ResizableOptions) {
    if (options?.disabled) return;

    const {
        edges = {
            left: true,
            top: true,
            right: true,
            bottom: true
        },
        minWidth = 50,
        minHeight = 50,
        onResizeStart = () => {},
        onResize = () => {},
        onResizeEnd = () => {}
    } = options || {};

    let isResizing = false;
    let activeResizer: ResizerType | null = null;
    let startX = 0;
    let startY = 0;
    let startWidth = 0;
    let startHeight = 0;
    let startOffsetLeft = 0;
    let startOffsetTop = 0;

    const startResize = (resizerType: ResizerType, e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        isResizing = true;
        activeResizer = resizerType;

        const computedStyle = getComputedStyle(el);
        startX = e.clientX;
        startY = e.clientY;
        startWidth = parseFloat(computedStyle.width);
        startHeight = parseFloat(computedStyle.height);
        startOffsetLeft = el.offsetLeft;
        startOffsetTop = el.offsetTop;

        onResizeStart(el, resizerType);

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', stopResize);
        document.addEventListener('mouseleave', stopResize);

        // Add resize-active class during resize
        el.classList.add('resize-active');
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isResizing || !activeResizer) return;

        const dx = e.clientX - startX;
        const dy = e.clientY - startY;

        let newWidth = startWidth;
        let newHeight = startHeight;

        switch (activeResizer) {
            case 'left':
                newWidth = Math.max(minWidth, startWidth - dx);
                el.style.left = `${startOffsetLeft + dx}px`;
                break;
            case 'right':
                newWidth = Math.max(minWidth, startWidth + dx);
                break;
            case 'top':
                newHeight = Math.max(minHeight, startHeight - dy);
                el.style.top = `${startOffsetTop + dy}px`;
                break;
            case 'bottom':
                newHeight = Math.max(minHeight, startHeight + dy);
                break;
            case 'top-left':
                newWidth = Math.max(minWidth, startWidth - dx);
                newHeight = Math.max(minHeight, startHeight - dy);
                el.style.left = `${startOffsetLeft + dx}px`;
                el.style.top = `${startOffsetTop + dy}px`;
                break;
            case 'top-right':
                newWidth = Math.max(minWidth, startWidth + dx);
                newHeight = Math.max(minHeight, startHeight - dy);
                el.style.top = `${startOffsetTop + dy}px`;
                break;
            case 'bottom-left':
                newWidth = Math.max(minWidth, startWidth - dx);
                newHeight = Math.max(minHeight, startHeight + dy);
                el.style.left = `${startOffsetLeft + dx}px`;
                break;
            case 'bottom-right':
                newWidth = Math.max(minWidth, startWidth + dx);
                newHeight = Math.max(minHeight, startHeight + dy);
                break;
        }

        el.style.width = `${newWidth}px`;
        el.style.height = `${newHeight}px`;

        onResize(el, {
            width: newWidth,
            height: newHeight
        });
    };

    const stopResize = () => {
        if (!isResizing) return;

        isResizing = false;
        activeResizer = null;

        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', stopResize);
        document.removeEventListener('mouseleave', stopResize);

        el.classList.remove('resize-active');
        onResizeEnd(el);
    };

    const createResizer = (type: ResizerType): HTMLElement => {
        const resizer = document.createElement('div');
        resizer.className = `v-resizer v-resizer-${type}`;
        resizer.addEventListener('mousedown', (e) => startResize(type, e as MouseEvent));
        return resizer;
    };

    // Ensure the element is positioned (relative, absolute, or fixed)
    const position = getComputedStyle(el).position;
    if (position === 'static') {
        el.style.position = 'relative';
    }

    // Add resizers based on options
    if (edges.left) el.appendChild(createResizer('left'));
    if (edges.top) el.appendChild(createResizer('top'));
    if (edges.right) el.appendChild(createResizer('right'));
    if (edges.bottom) el.appendChild(createResizer('bottom'));

    // Add corner resizers if needed
    if (edges.left && edges.top) el.appendChild(createResizer('top-left'));
    if (edges.right && edges.top) el.appendChild(createResizer('top-right'));
    if (edges.left && edges.bottom) el.appendChild(createResizer('bottom-left'));
    if (edges.right && edges.bottom) el.appendChild(createResizer('bottom-right'));
}

export default ResizableDirective;
