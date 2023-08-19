import codes from './firebase_errors.json';

export const formatFirebaseError = (errorCode: string) => {
    // @ts-ignore
    return codes[errorCode] ?? 'Something went wrong. Please contact support';
};
