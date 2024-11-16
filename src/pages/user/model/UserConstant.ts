export enum UserType {
  ADMIN,
  USER,
  ETC,
}

export const getUserType = (_value: string): string => {
  return (
    Object.values(UserType)
      .filter((value) => typeof value === 'string')
      .find((value) => value === _value)
      ?.toString() ?? _value
  );
};

export enum UserState {
  ACTIVE,
  INACTIVE,
}

export const getUserState = (_value: string): string => {
  return (
    Object.values(UserState)
      .filter((value) => typeof value === 'string')
      .find((value) => value === _value)
      ?.toString() ?? _value
  );
};

export enum UserRole {
  ADMIN,
  USER,
}

export const getUserRole = (_value: string): string => {
  return (
    Object.values(UserRole)
      .filter((value) => typeof value === 'string')
      .find((value) => value === _value)
      ?.toString() ?? _value
  );
};
