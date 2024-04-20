export default class BusinessException extends Error {
  getCode(): number {
    return 422;
  }
}
