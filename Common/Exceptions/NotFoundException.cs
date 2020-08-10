namespace Books.Common.Exceptions
{
    public class NotFoundException : ApiException
    {
        public NotFoundException() : base()
        {
        }

        public NotFoundException(string itemName) : base($"{itemName} not found!")
        {
        }
    }
}
