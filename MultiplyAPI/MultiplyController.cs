using Microsoft.AspNetCore.Mvc;

namespace MultiplyAPI;

[ApiController]
[Route("multiply")]
public class MultiplyController :  ControllerBase
{
    [HttpPost]
    public IActionResult Multiply([FromBody] NumberInput? input)
    {
        if (input == null)
        {
            return BadRequest("Input value is null");
        }

        if (!double.TryParse(input.Number, out double number))
        {
            return BadRequest("Input value is not a number");
        }
        var result = number * 2;
        return Ok(new {result = result.ToString()});
    }
    
}

public record NumberInput(string Number);
