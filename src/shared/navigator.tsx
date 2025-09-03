type LinkedNode = {
    value: string,
    next: LinkedNode | null;
}

const linkedList: LinkedNode = {
    value: '/test1',
    next: {
        value: '/test2',
        next: {
            value: '/test3',
            next: null
        }
    }
}

export function NextButton() {
    const currentPath = window.location.pathname;

    function getNext() {
        let current = linkedList;

        while(current?.next) {
            if (current.value === currentPath) {
                return current.next?.value ?? '/';
            }

            current = current.next;
        }

        return '/';
    }

    return <a className={'underline'} href={getNext()}>Next</a>
}

export function PreviousButton() {
    const currentPath = window.location.pathname;

    function getPrev() {
        let prev: LinkedNode | null = null;
        let current: LinkedNode | null = linkedList;

        while (current) {
            if (current.value === currentPath) {
                return prev ? prev.value : null;
            }
            prev = current;
            current = current.next;
        }

        return null;
    }
    const prev = getPrev();

    if (!prev) return;

    return <a className={'underline'} href={prev}>Previous</a>
}