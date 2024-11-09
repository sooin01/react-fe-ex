const MyComponent = ({ name, children }: { name: string; children: string }) => {
    return (
        <div>
            안녕하세요. 제 이름은 {name}
            <br />
            children 값은 {children}입니다.
        </div>
    );
};

export default MyComponent;
