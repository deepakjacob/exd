
export interface HasFocus {
    hasFocus: boolean;
    onFocus: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
}

export interface HasDelete {
    onDelete: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
}
